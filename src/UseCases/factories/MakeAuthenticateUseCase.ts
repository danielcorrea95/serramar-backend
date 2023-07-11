import { PrismaUserRepository } from '@/repositories/prisma/PrismaUserRepository'
import { PrismaUserTokenRepository } from '@/repositories/prisma/PrismaUserTokenRepository'
import { DayjsDateProvider } from '@/shared/providers/dateProvider/implementations/DayjsDateProvider'
import { PrismaUserPermissionRepository } from '@/repositories/prisma/PrismaUserPermissionRepository'
import { PrismaUserRoleRepository } from '@/repositories/prisma/PrismaUserRoleRepository'
import { AuthenticateUseCase } from '../sessions/AuthenticateUseCase'

export function MakeAuthenticateUseCase() {
  const prismaUsersRepository = new PrismaUserRepository()
  const prismaUsersTokensRepository = new PrismaUserTokenRepository()
  const dateProvider = new DayjsDateProvider()
  const prismaUserPermissions = new PrismaUserPermissionRepository()
  const prismaUserRoles = new PrismaUserRoleRepository()
  const authenticateUseCase = new AuthenticateUseCase(
    prismaUsersRepository,
    prismaUsersTokensRepository,
    dateProvider,
    prismaUserPermissions,
    prismaUserRoles,
  )

  return authenticateUseCase
}
