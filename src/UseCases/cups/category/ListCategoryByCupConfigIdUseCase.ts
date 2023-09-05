import { CategoriesRepository } from '@/repositories/CategoriesRepository'

export class ListCategoryByCupConfigIdUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute(cupConfigId: string) {
    const categories = await this.categoriesRepository.findByCupConfigId(
      cupConfigId,
    )

    return categories
  }
}
