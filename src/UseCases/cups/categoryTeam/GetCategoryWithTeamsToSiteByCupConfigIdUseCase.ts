import { CategoryTeamRepository } from '@/repositories/CategoryTeamRepository'

export class GetCategoryWithTeamsToSiteByCupConfigIdUseCase {
  constructor(private categoryTeamRepository: CategoryTeamRepository) {}

  async execute(cupConfigId: string) {
    const categories =
      await this.categoryTeamRepository.getCategoryWithTeamsByCupConfigId(
        cupConfigId,
      )

    const categoriesWithTeams = Object.values(categories)

    return categoriesWithTeams
  }
}
