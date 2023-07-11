import { TeamAlreadHasTechnicalCommitteeError } from '@/UseCases/errors/TeamAlreadHasTechnicalCommitteeError'
import { TechnicalCommitteeAlreadyExistsError } from '@/UseCases/errors/TechnicalCommitteeAlreadyExistsError'
import { CategoryTeamTechnicalCommitteeRepository } from '@/repositories/CategoryTeamTechnicalCommitteeRepository'

interface LinkCategoryTeamTechnicalCommittedRequest {
  categoryId: string
  teamId: string
  technicalCommitteeId: string
  technicalCommitteeTypeId: string
}

export class LinkCategoryTeamTechnicalCommitteeUseCase {
  constructor(
    private categoryTeamTechnicalCommitteeRepository: CategoryTeamTechnicalCommitteeRepository,
  ) {}

  async execute({
    categoryId,
    teamId,
    technicalCommitteeId,
    technicalCommitteeTypeId,
  }: LinkCategoryTeamTechnicalCommittedRequest) {
    const technicalCommitteeAlreadyExists =
      await this.categoryTeamTechnicalCommitteeRepository.findByTechnicalCommitteeIdAndCategoryId(
        technicalCommitteeId,
        categoryId,
      )

    if (technicalCommitteeAlreadyExists) {
      throw new TechnicalCommitteeAlreadyExistsError()
    }

    const teamAlreadHasTechnicalCommittee =
      await this.categoryTeamTechnicalCommitteeRepository.findByTeamIdAndCategoryIdAndTechnicalCommitteeTypeId(
        teamId,
        categoryId,
        technicalCommitteeTypeId,
      )

    if (teamAlreadHasTechnicalCommittee) {
      throw new TeamAlreadHasTechnicalCommitteeError()
    }

    const link = await this.categoryTeamTechnicalCommitteeRepository.create({
      team_id: teamId,
      category_id: categoryId,
      technical_committee_id: technicalCommitteeId,
      technical_committee_type_id: technicalCommitteeTypeId,
    })

    return link
  }
}
