import { CreateCategoryUseCase } from '@/UseCases/cups/category/CreateCategoryUseCase'
import { PrismaCategoriesRepository } from '@/repositories/prisma/PrismaCategoriesRepository'
import { PrismaGroupsRepository } from '@/repositories/prisma/PrismaGroupsRepository'
export function MakeCreateCategoryUseCase() {
  const prismaCategoriesRepository = new PrismaCategoriesRepository()
  const prismaGroupsRepository = new PrismaGroupsRepository()
  const createCategoryUseCase = new CreateCategoryUseCase(
    prismaCategoriesRepository,
    prismaGroupsRepository,
  )

  return createCategoryUseCase
}
