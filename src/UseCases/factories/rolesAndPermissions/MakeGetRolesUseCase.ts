import { PrismaRoleRepository } from '@/repositories/prisma/PrismaRoleRepository'
import { PrismaUserRoleRepository } from '@/repositories/prisma/PrismaUserRoleRepository'
import { GetRolesUseCase } from '@/UseCases/rolesAndPermissions/GetRolesUseCase'

export function MakeGetRolesUseCase() {
  const prismaRoleRepository = new PrismaRoleRepository()
  const prismaUserRoleRepository = new PrismaUserRoleRepository()
  const getRolesUseCase = new GetRolesUseCase(
    prismaRoleRepository,
    prismaUserRoleRepository,
  )

  return getRolesUseCase
}
