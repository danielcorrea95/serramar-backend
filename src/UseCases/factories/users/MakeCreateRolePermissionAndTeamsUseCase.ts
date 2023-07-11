import { PrismaCategoriesRepository } from '@/repositories/prisma/PrismaCategoriesRepository'
import { PrismaPermissionRoleRepository } from '@/repositories/prisma/PrismaPermissionRoleRepository'
import { PrismaRoleRepository } from '@/repositories/prisma/PrismaRoleRepository'
import { PrismaTeamsRepository } from '@/repositories/prisma/PrismaTeamsRepository'
import { PrismaTeamUserRepository } from '@/repositories/prisma/PrismaTeamUserRepository'
import { PrismaUserPermissionRepository } from '@/repositories/prisma/PrismaUserPermissionRepository'
import { PrismaUserRepository } from '@/repositories/prisma/PrismaUserRepository'
import { PrismaUserRoleRepository } from '@/repositories/prisma/PrismaUserRoleRepository'
import { CreateRolePermissionAndTeamsUseCase } from '@/UseCases/users/CreateRolePermissionAndTeamsUseCase'

export function MakeCreateRolePermissionAndTeamsUseCase() {
  const prismaUsersRepository = new PrismaUserRepository()
  const prismaRoleRepository = new PrismaRoleRepository()
  const prismaUserRoleRepository = new PrismaUserRoleRepository()
  const prismaPermissionRolesRepository = new PrismaPermissionRoleRepository()
  const prismaUserPermissionsRepository = new PrismaUserPermissionRepository()
  const prismaTeamUserRepository = new PrismaTeamUserRepository()
  const prismaTeamsRepository = new PrismaTeamsRepository()
  const prismaCategoriesRepository = new PrismaCategoriesRepository()
  const createRolePermissionAndTeamsUseCase =
    new CreateRolePermissionAndTeamsUseCase(
      prismaUsersRepository,
      prismaRoleRepository,
      prismaUserRoleRepository,
      prismaPermissionRolesRepository,
      prismaUserPermissionsRepository,
      prismaTeamUserRepository,
      prismaTeamsRepository,
      prismaCategoriesRepository,
    )

  return createRolePermissionAndTeamsUseCase
}
