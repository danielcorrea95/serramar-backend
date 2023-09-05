import { ListCategoryByCupConfigIdUseCase } from '@/UseCases/cups/category/ListCategoryByCupConfigIdUseCase'
import { PrismaCategoriesRepository } from '@/repositories/prisma/PrismaCategoriesRepository'

export function MakeListCategoryByCupConfigIdUseCase() {
  const prismaCategoriesRepository = new PrismaCategoriesRepository()
  const listCategoryByCupConfigIdUseCase = new ListCategoryByCupConfigIdUseCase(
    prismaCategoriesRepository,
  )

  return listCategoryByCupConfigIdUseCase
}
