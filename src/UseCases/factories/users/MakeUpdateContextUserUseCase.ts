import { PrismaCategoriesRepository } from '@/repositories/prisma/PrismaCategoriesRepository'
import { PrismaCupConfigRepositoy } from '@/repositories/prisma/PrismaCupConfigRepository'
import { PrismaTeamsRepository } from '@/repositories/prisma/PrismaTeamsRepository'
import { PrismaUserRepository } from '@/repositories/prisma/PrismaUserRepository'
import { UpdateContextUserUseCase } from '@/UseCases/users/UpdateContextUserUseCase'

export function MakeUpdateContextUserUseCase() {
  const prismaUsersRepository = new PrismaUserRepository()
  const prismaTeamRepository = new PrismaTeamsRepository()
  const prismaCupConfigRepository = new PrismaCupConfigRepositoy()
  const prismaCategoryRepository = new PrismaCategoriesRepository()
  const updateContextUserUseCase = new UpdateContextUserUseCase(
    prismaUsersRepository,
    prismaTeamRepository,
    prismaCupConfigRepository,
    prismaCategoryRepository,
  )

  return updateContextUserUseCase
}
