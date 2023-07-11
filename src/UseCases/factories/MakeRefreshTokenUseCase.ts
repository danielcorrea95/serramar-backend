import { PrismaUserPermissionRepository } from '@/repositories/prisma/PrismaUserPermissionRepository'
import { PrismaUserRoleRepository } from '@/repositories/prisma/PrismaUserRoleRepository'
import { PrismaUserTokenRepository } from '@/repositories/prisma/PrismaUserTokenRepository'
import { DayjsDateProvider } from '@/shared/providers/dateProvider/implementations/DayjsDateProvider'
import { RefreshTokenUseCase } from '../sessions/RefreshTokenUseCase'

export function MakeRefreshTokenUseCase() {
  const prismaUsersTokensRepository = new PrismaUserTokenRepository()
  const dateProvider = new DayjsDateProvider()
  const prismaUserPermissionsRepository = new PrismaUserPermissionRepository()
  const prismaUserRolesRepository = new PrismaUserRoleRepository()
  const refreshTokenUseCase = new RefreshTokenUseCase(
    prismaUsersTokensRepository,
    dateProvider,
    prismaUserPermissionsRepository,
    prismaUserRolesRepository,
  )

  return refreshTokenUseCase
}
