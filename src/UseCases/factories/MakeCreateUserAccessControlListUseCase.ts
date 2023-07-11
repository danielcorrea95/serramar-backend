import { PrismaPermissionRepository } from '@/repositories/prisma/PrismaPermissionRepository'
import { PrismaUserRepository } from '@/repositories/prisma/PrismaUserRepository'
import { PrismaRoleRepository } from '@/repositories/prisma/PrismaRoleRepository'
import { PrismaUserPermissionRepository } from '@/repositories/prisma/PrismaUserPermissionRepository'
import { PrismaUserRoleRepository } from '@/repositories/prisma/PrismaUserRoleRepository'
import { CreateUserAccessControlListUseCase } from '../rolesAndPermissions/CreateUserAccessControlListUseCase'

export function MakeCreateUserAccessListControlUseCase() {
  const prismaUserRepository = new PrismaUserRepository()
  const prismaPermissionRepository = new PrismaPermissionRepository()
  const prismaUserPermissionRepository = new PrismaUserPermissionRepository()
  const prismaRoleRepository = new PrismaRoleRepository()
  const prismaUserRolesRepository = new PrismaUserRoleRepository()
  const createUserAccessControlListUseCase =
    new CreateUserAccessControlListUseCase(
      prismaUserRepository,
      prismaPermissionRepository,
      prismaUserPermissionRepository,
      prismaRoleRepository,
      prismaUserRolesRepository,
    )

  return createUserAccessControlListUseCase
}
