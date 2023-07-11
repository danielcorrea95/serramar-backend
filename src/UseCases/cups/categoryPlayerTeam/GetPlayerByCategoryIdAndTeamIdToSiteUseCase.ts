import { CategoryPlayerTeamRepository } from '@/repositories/CategoryPlayerTeamRepository'

export class GetPlayerByCategoryIdAndTeamIdToSiteUseCase {
  constructor(private categoryPlayerTeam: CategoryPlayerTeamRepository) {}

  async execute(categoryId: string, teamId: string) {
    const players =
      await this.categoryPlayerTeam.findPlayersByCategoryIdAndTeamIdToSite(
        categoryId,
        teamId,
      )

    return players
  }
}
