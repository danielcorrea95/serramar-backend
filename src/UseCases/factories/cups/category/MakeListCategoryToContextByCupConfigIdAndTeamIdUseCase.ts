import { ListCategoryToContextByCupConfigIdAndTeamIdUseCase } from '@/UseCases/cups/category/ListCategoryToContextByCupConfigIdAndTeamIdUseCase'
import { PrismaCategoriesRepository } from '@/repositories/prisma/PrismaCategoriesRepository'

export function MakeListCategoryToContextByCupConfigIdAndTeamIdUseCase() {
  const prismaCategoriesRepository = new PrismaCategoriesRepository()
  const listCategoryToContextByCupIdAndTeamIdUseCase =
    new ListCategoryToContextByCupConfigIdAndTeamIdUseCase(
      prismaCategoriesRepository,
    )

  return listCategoryToContextByCupIdAndTeamIdUseCase
}
