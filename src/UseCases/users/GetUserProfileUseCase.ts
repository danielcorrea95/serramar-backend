import { UserPermissionsRepository } from '@/repositories/UserPermissionsRepository'
import { UserRolesRepository } from '@/repositories/UserRolesRepository'
import { UsersRepository } from '@/repositories/UsersRepository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError'

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: User
  permissions: string[]
  roles: string[]
}

export class GetUserProfileUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private userPermissionRepository: UserPermissionsRepository,
    private userRoleRepository: UserRolesRepository,
  ) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const userPermission =
      await this.userPermissionRepository.findPermissionsByUserId(userId)

    const userRole = await this.userRoleRepository.findRolesByUserId(userId)

    return {
      user,
      permissions: userPermission,
      roles: userRole,
    }
  }
}
