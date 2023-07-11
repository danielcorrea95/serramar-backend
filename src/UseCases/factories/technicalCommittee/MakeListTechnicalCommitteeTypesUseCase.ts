import { PrismaTechnicalCommitteeTypesRepository } from '@/repositories/prisma/PrismaTechnicalCommitteeTypesRepository'
import { ListTechnicalCommitteeTypesUseCase } from '@/UseCases/technicalCommittee/ListTechnicalCommitteeTypesUseCase'

export function MakeListTechnicalCommitteeTypesUseCase() {
  const prismaTechnicalCommitteeTypesRepository =
    new PrismaTechnicalCommitteeTypesRepository()
  const listTechnicalCommitteeTypesUseCase =
    new ListTechnicalCommitteeTypesUseCase(
      prismaTechnicalCommitteeTypesRepository,
    )

  return listTechnicalCommitteeTypesUseCase
}
