import Auth from '@/config/Auth'
import { UsersTokensRepository } from '@/repositories/UsersTokensRepository'
import { verify, sign } from 'jsonwebtoken'
import { DateProvider } from '@/shared/providers/dateProvider/DateProvider'
import { UserRolesRepository } from '@/repositories/UserRolesRepository'
import { UserPermissionsRepository } from '@/repositories/UserPermissionsRepository'
import { RefreshTokenError } from '../errors/RefreshTokenError'

interface Payload {
  sub: string
  username: string
}

interface RefreshTokenUseCaseResponse {
  token: string
  refresh_token: string
}

export class RefreshTokenUseCase {
  constructor(
    private usersTokensRepository: UsersTokensRepository,
    private dateProvider: DateProvider,
    private userPermissions: UserPermissionsRepository,
    private userRoles: UserRolesRepository,
  ) {}

  async execute(token: string): Promise<RefreshTokenUseCaseResponse> {
    const {
      secret_token,
      expires_in_token,
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = Auth
    const { username, sub } = verify(
      token,
      Auth.secret_refresh_token,
    ) as Payload

    const userId = sub

    const roles = await this.userRoles.findRolesByUserId(userId)

    const permissions = await this.userPermissions.findPermissionsByUserId(
      userId,
    )

    const newToken = sign({ username, roles, permissions }, secret_token, {
      subject: userId,
      expiresIn: expires_in_token,
    })

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        userId,
        token,
      )

    if (!userToken) {
      throw new RefreshTokenError()
    }

    await this.usersTokensRepository.deleteById(userToken.id)

    const expires_date = this.dateProvider.addDays(expires_refresh_token_days)

    const refresh_token = sign({ username }, secret_refresh_token, {
      subject: sub,
      expiresIn: expires_in_refresh_token,
    })

    await this.usersTokensRepository.create({
      user_id: userId,
      refresh_token,
      expires_date,
    })

    return {
      token: newToken,
      refresh_token,
    }
  }
}
