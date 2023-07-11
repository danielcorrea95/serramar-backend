import { ResourceNotFoundError } from '@/UseCases/errors/ResourceNotFoundError'
import { CategoryTeamTechnicalCommitteeRepository } from '@/repositories/CategoryTeamTechnicalCommitteeRepository'

interface DeleteTechnicalProps {
  technicalCommitteeId: string
  teamId: string
  categoryId: string
}

export class DeleteLinkByTechnicalCommitteeIdTeamIdCategoryidUseCase {
  constructor(
    private categoryTeamTechnicalCommitteeRepository: CategoryTeamTechnicalCommitteeRepository,
  ) {}

  async execute({
    technicalCommitteeId,
    categoryId,
    teamId,
  }: DeleteTechnicalProps) {
    const linkId =
      await this.categoryTeamTechnicalCommitteeRepository.findByTeamIdCategoryIdTechnicalCommitteeId(
        teamId,
        categoryId,
        technicalCommitteeId,
      )

    if (!linkId) {
      throw new ResourceNotFoundError()
    }

    await this.categoryTeamTechnicalCommitteeRepository.deleteLink(linkId.id)
  }
}
