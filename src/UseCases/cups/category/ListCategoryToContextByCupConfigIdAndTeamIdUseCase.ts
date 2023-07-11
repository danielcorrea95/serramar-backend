import { CategoriesRepository } from '@/repositories/CategoriesRepository'

interface ListCategoryByCupIdAndTeamId {
  cupConfigId: string
  teamId: string
}

export class ListCategoryToContextByCupConfigIdAndTeamIdUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({ cupConfigId, teamId }: ListCategoryByCupIdAndTeamId) {
    const categories = this.categoriesRepository.findByCupConfigIdAndTeamId(
      cupConfigId,
      teamId,
    )

    return categories
  }
}
