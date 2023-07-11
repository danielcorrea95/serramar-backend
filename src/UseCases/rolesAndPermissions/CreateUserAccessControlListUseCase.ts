import { UsersRepository } from '@/repositories/UsersRepository'
import { PermissionsRepository } from '@/repositories/PermissionsRepository'
import { UserPermissionsRepository } from '@/repositories/UserPermissionsRepository'
import { UserRolesRepository } from '@/repositories/UserRolesRepository'
import { RolesRepository } from '@/repositories/RolesRepository'
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError'

interface UserACLRequest {
  userId: string
  roles: string[]
  permissions: string[]
}

export class CreateUserAccessControlListUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private permissionsRepository: PermissionsRepository,
    private userPermissionsRepository: UserPermissionsRepository,
    private rolesRepository: RolesRepository,
    private userRolesRepository: UserRolesRepository,
  ) {}

  async execute({ userId, permissions, roles }: UserACLRequest) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const userAlreadExistsPermissions =
      await this.userPermissionsRepository.findByUserId(userId)

    if (userAlreadExistsPermissions) {
      await this.userPermissionsRepository.delete(userId)
    }

    const userAlreadExistsRoles = await this.userRolesRepository.findByUserId(
      userId,
    )

    if (userAlreadExistsRoles) {
      await this.userRolesRepository.delete(userId)
    }

    const permissionExists = await this.permissionsRepository.findByIds(
      permissions,
    )

    permissionExists.map(async (permission) => {
      await this.userPermissionsRepository.create(user.id, permission.id)
    })

    const roleExists = await this.rolesRepository.findByRoleIds(roles)

    roleExists.map(async (role) => {
      await this.userRolesRepository.createUserWithRole(userId, role.id)
    })

    return user
  }
}
