import { PrismaCategoryTeamTechnicalCommitteeRepository } from '@/repositories/prisma/PrismaCategoryTeamTechnicalCommitteeRepository'
import { GetTechnicalCommitteeByTeamIdAndCategoryIdUseCase } from '@/UseCases/cups/categoryTeamTechnicalCommittee/GetTechnicalCommitteeByTeamIdAndCategoryIdUseCase'

export function MakeGetTechnicalCommitteeByTeamIdAndCategoryIdUseCase() {
  const prismaCategoryTeamTechnicalCommitteeRepository =
    new PrismaCategoryTeamTechnicalCommitteeRepository()
  const getTechnicalCommitteeByTeamIdAndCategoryIdUseCase =
    new GetTechnicalCommitteeByTeamIdAndCategoryIdUseCase(
      prismaCategoryTeamTechnicalCommitteeRepository,
    )

  return getTechnicalCommitteeByTeamIdAndCategoryIdUseCase
}
