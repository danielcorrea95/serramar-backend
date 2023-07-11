import { PrismaUserPermissionRepository } from '@/repositories/prisma/PrismaUserPermissionRepository'
import { PrismaUserRepository } from '@/repositories/prisma/PrismaUserRepository'
import { PrismaUserRoleRepository } from '@/repositories/prisma/PrismaUserRoleRepository'
import { GetUserProfileUseCase } from '../users/GetUserProfileUseCase'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUserRepository()
  const userPermissionRepository = new PrismaUserPermissionRepository()
  const userRoleRepository = new PrismaUserRoleRepository()
  const useCase = new GetUserProfileUseCase(
    usersRepository,
    userPermissionRepository,
    userRoleRepository,
  )

  return useCase
}
