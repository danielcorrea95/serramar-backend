import { PrismaTeamsRepository } from '@/repositories/prisma/PrismaTeamsRepository'
import { PrismaUserRepository } from '@/repositories/prisma/PrismaUserRepository'
import { PrismaUserRoleRepository } from '@/repositories/prisma/PrismaUserRoleRepository'
import { ListAllUsersUseCase } from '../users/ListAllUsersUseCase'

export function MakeListAllUsersUseCase() {
  const prismaUsersRepository = new PrismaUserRepository()
  const prismaUserRoleRepository = new PrismaUserRoleRepository()
  const prismaTeamRepository = new PrismaTeamsRepository()
  const listAllUsersUseCase = new ListAllUsersUseCase(
    prismaUsersRepository,
    prismaUserRoleRepository,
    prismaTeamRepository,
  )

  return listAllUsersUseCase
}
