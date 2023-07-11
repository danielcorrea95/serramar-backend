import { UsersRepository } from '@/repositories/UsersRepository'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { UsersTokensRepository } from '@/repositories/UsersTokensRepository'
import Auth from '@/config/Auth'
import { DateProvider } from '@/shared/providers/dateProvider/DateProvider'
import { UserPermissionsRepository } from '@/repositories/UserPermissionsRepository'
import { UserRolesRepository } from '@/repositories/UserRolesRepository'
import { InvalidCredentialsError } from '../errors/InvalidCredentialsError'

interface AuthenticateUseCaseRequest {
  username: string
  password: string
}

interface AuthenticateUseCaseResponse {
  token: string
  refresh_token: string
  user: {
    id: string
    name: string
    username: string
    email?: string
    sel_team_id: string | null
    sel_cup_config_id: string | null
    sel_category_id: string | null
    permissions: string[]
    roles: string[]
  }
}

export class AuthenticateUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private usersTokensRepository: UsersTokensRepository,
    private dateProvider: DateProvider,
    private userPermissions: UserPermissionsRepository,
    private userRoles: UserRolesRepository,
  ) {}

  async execute({
    username,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const {
      secret_token,
      expires_in_token,
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = Auth
    const user = await this.usersRepository.findByUsername(username)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    const roles = await this.userRoles.findRolesByUserId(user.id)

    const permissions = await this.userPermissions.findPermissionsByUserId(
      user.id,
    )

    const token = sign({ username, roles, permissions }, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    })

    const refresh_token = sign({ username }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    })

    const expires_date = this.dateProvider.addDays(expires_refresh_token_days)

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date,
    })

    const userPermission = await this.userPermissions.findPermissionsByUserId(
      user.id,
    )

    const userRole = await this.userRoles.findRolesByUserId(user.id)

    return {
      token,
      refresh_token,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email ? user.email : undefined,
        sel_team_id: user.sel_team_id,
        sel_cup_config_id: user.sel_cup_config_id,
        sel_category_id: user.sel_category_id,
        permissions: userPermission,
        roles: userRole,
      },
    }
  }
}
