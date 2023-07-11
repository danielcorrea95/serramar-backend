import { DeleteLinkByTechnicalCommitteeIdTeamIdCategoryidUseCase } from '@/UseCases/cups/categoryTeamTechnicalCommittee/DeleteLinkByTechnicalCommitteeIdTeamIdCategoryIdUseCase'
import { PrismaCategoryTeamTechnicalCommitteeRepository } from '@/repositories/prisma/PrismaCategoryTeamTechnicalCommitteeRepository'

export function MakeDeleteLinkByTechnicalCommitteeIdTeamIdCategoryIdUseCase() {
  const prismaCategoryTeamTechnicalCommitteeRepository =
    new PrismaCategoryTeamTechnicalCommitteeRepository()
  const deleteLinkByTechnicalCommitteeIdTeamIdCategoryidUseCase =
    new DeleteLinkByTechnicalCommitteeIdTeamIdCategoryidUseCase(
      prismaCategoryTeamTechnicalCommitteeRepository,
    )

  return deleteLinkByTechnicalCommitteeIdTeamIdCategoryidUseCase
}
