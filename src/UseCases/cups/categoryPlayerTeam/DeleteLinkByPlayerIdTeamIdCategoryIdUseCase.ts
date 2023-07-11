import { ResourceNotFoundError } from '@/UseCases/errors/ResourceNotFoundError'
import { CategoryPlayerTeamRepository } from '@/repositories/CategoryPlayerTeamRepository'

interface CategoryPlayerTeamRequest {
  playerId: string
  teamId: string
  categoryId: string
}

export class DeleteLinkByPlayerIdTeamIdCategoryIdUseCase {
  constructor(
    private categoryPlayerTeamRepository: CategoryPlayerTeamRepository,
  ) {}

  async execute({ playerId, teamId, categoryId }: CategoryPlayerTeamRequest) {
    const linkId =
      await this.categoryPlayerTeamRepository.findByCategoryIdTeamIdPlayerId(
        categoryId,
        playerId,
        teamId,
      )

    if (!linkId) {
      throw new ResourceNotFoundError()
    }

    await this.categoryPlayerTeamRepository.delete(linkId.id)
  }
}
