import { CategoryPlayerTeamRepository } from '@/repositories/CategoryPlayerTeamRepository'
import { LinkAlreadyExistsError } from '@/UseCases/errors/LinkAlreadyExistsError'
import { PlayerAlreadyActiveForAnotherTeamError } from '@/UseCases/errors/playerAlreadyActiveForAnotherTeamError'
import { CategoryPlayerTeam } from '@prisma/client'

interface CategoryPlayerTeamUseCaseRequest {
  categoryId: string
  playerId: string
  teamId: string
  active?: boolean
}

interface CategoryPlayerTeamUseCaseResponse {
  categoryPlayerTeam: CategoryPlayerTeam
}

export class LinkCategoryPlayerTeamUseCase {
  constructor(
    private categoryPlayerTeamCategory: CategoryPlayerTeamRepository,
  ) {}

  async execute({
    categoryId,
    playerId,
    teamId,
    active = false,
  }: CategoryPlayerTeamUseCaseRequest): Promise<CategoryPlayerTeamUseCaseResponse> {
    const playerAlreadyActiveForAnotherTeam =
      await this.categoryPlayerTeamCategory.findPlayerActiveAnotherTeamThisCategoryId(
        categoryId,
        playerId,
        teamId,
      )

    if (playerAlreadyActiveForAnotherTeam) {
      throw new PlayerAlreadyActiveForAnotherTeamError()
    }

    const linkAlreadyExists =
      await this.categoryPlayerTeamCategory.findByCategoryIdTeamIdPlayerId(
        categoryId,
        playerId,
        teamId,
      )

    if (linkAlreadyExists) {
      throw new LinkAlreadyExistsError()
    }

    const categoryPlayerTeam = await this.categoryPlayerTeamCategory.create({
      category_id: categoryId,
      player_id: playerId,
      team_id: teamId,
      active,
    })

    return {
      categoryPlayerTeam,
    }
  }
}
