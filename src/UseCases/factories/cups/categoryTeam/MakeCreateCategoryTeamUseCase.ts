import { CreateCategoryTeamUseCase } from '@/UseCases/cups/categoryTeam/CreateCategoryTeamUseCase'
import { PrismaCategoriesRepository } from '@/repositories/prisma/PrismaCategoriesRepository'
import { PrismaCategoryTeamRepository } from '@/repositories/prisma/PrismaCategoryTeamRepository'
import { PrismaUserRepository } from '@/repositories/prisma/PrismaUserRepository'
import { PrismaTeamUserRepository } from '@/repositories/prisma/PrismaTeamUserRepository'

export function MakeCreateCategoryTeamUseCase() {
  const prismaCategoryTeamRepository = new PrismaCategoryTeamRepository()
  const prismaCategoriesRepository = new PrismaCategoriesRepository()
  const prismaUsersRepository = new PrismaUserRepository()
  const PrismaUserTeamRepository = new PrismaTeamUserRepository()
  const createCategoryTeamUseCase = new CreateCategoryTeamUseCase(
    prismaCategoryTeamRepository,
    prismaCategoriesRepository,
    prismaUsersRepository,
    PrismaUserTeamRepository,
  )

  return createCategoryTeamUseCase
}
