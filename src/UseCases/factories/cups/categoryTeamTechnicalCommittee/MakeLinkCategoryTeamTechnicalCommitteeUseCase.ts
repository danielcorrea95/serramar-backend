import { PrismaCategoryTeamTechnicalCommitteeRepository } from '@/repositories/prisma/PrismaCategoryTeamTechnicalCommitteeRepository'
import { LinkCategoryTeamTechnicalCommitteeUseCase } from '@/UseCases/cups/categoryTeamTechnicalCommittee/LinkCategoryTeamTechnicalCommitteeUseCase'

export function MakeLinkCategoryTeamTechnicalCommitteeUseCase() {
  const prismaCategoryTeamTechnicalCommitteeRepository =
    new PrismaCategoryTeamTechnicalCommitteeRepository()
  const linkCategoryTeamTechnicalCommitteeUseCase =
    new LinkCategoryTeamTechnicalCommitteeUseCase(
      prismaCategoryTeamTechnicalCommitteeRepository,
    )

  return linkCategoryTeamTechnicalCommitteeUseCase
}
