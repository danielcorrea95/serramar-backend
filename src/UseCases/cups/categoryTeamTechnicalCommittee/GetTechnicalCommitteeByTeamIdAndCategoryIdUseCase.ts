import { CategoryTeamTechnicalCommitteeRepository } from '@/repositories/CategoryTeamTechnicalCommitteeRepository'

export class GetTechnicalCommitteeByTeamIdAndCategoryIdUseCase {
  constructor(
    private categoryTeamTechnicalCommitteeRepository: CategoryTeamTechnicalCommitteeRepository,
  ) {}

  async execute(teamId: string, categoryId: string) {
    const technicalCommittee =
      await this.categoryTeamTechnicalCommitteeRepository.findCategoryIdAndTeamId(
        teamId,
        categoryId,
      )

    return technicalCommittee
  }
}
