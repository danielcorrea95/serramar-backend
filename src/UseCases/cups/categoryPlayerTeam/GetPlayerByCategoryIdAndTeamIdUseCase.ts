import { CategoryPlayerTeamRepository } from '@/repositories/CategoryPlayerTeamRepository'

interface CategoryPlayerTeamRequest {
  categoryId: string
  teamId: string
}

export class GetPlayerByCategoryIdAndTeamIdUseCase {
  constructor(
    private categoryPleyerTeamRepository: CategoryPlayerTeamRepository,
  ) {}

  async execute({ categoryId, teamId }: CategoryPlayerTeamRequest) {
    const players =
      await this.categoryPleyerTeamRepository.findPlayerByCategoryIdAndTeamId(
        categoryId,
        teamId,
      )

    return players
  }
}
