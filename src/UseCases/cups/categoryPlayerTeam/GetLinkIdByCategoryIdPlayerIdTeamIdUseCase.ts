import { CategoryPlayerTeamRepository } from '@/repositories/CategoryPlayerTeamRepository'

export class GetLinkIdByCategoryIdPlayerIdTeamIdUseCase {
  constructor(
    private categoryPlayerTeamRepository: CategoryPlayerTeamRepository,
  ) {}

  async execute(categoryId: string, teamId: string, playerId: string) {
    const linkId =
      this.categoryPlayerTeamRepository.findByCategoryIdTeamIdPlayerId(
        categoryId,
        playerId,
        teamId,
      )
    return linkId
  }
}
