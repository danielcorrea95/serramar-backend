import { PrismaPermissionRepository } from '@/repositories/prisma/PrismaPermissionRepository'
import { PrismaPermissionRoleRepository } from '@/repositories/prisma/PrismaPermissionRoleRepository'
import { PrismaRoleRepository } from '@/repositories/prisma/PrismaRoleRepository'
import { CreatePermissionRoleUseCase } from '../rolesAndPermissions/CreatePermissionRoleUseCase'

export function MakeCreatePermissionRoleUseCase() {
  const prismaRolesRepository = new PrismaRoleRepository()
  const prismaPermissionRepository = new PrismaPermissionRepository()
  const prismaPermissionRoleRepository = new PrismaPermissionRoleRepository()
  const createPermissionRoleUseCase = new CreatePermissionRoleUseCase(
    prismaRolesRepository,
    prismaPermissionRepository,
    prismaPermissionRoleRepository,
  )

  return createPermissionRoleUseCase
}
