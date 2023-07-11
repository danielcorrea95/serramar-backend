import { FindTechnicalCommitteeByDocumentUseCase } from '@/UseCases/technicalCommittee/FindTechnicalCommitteeByDocumentUseCase'
import { PrismaTechnicalCommitteeRepository } from '@/repositories/prisma/PrismaTechnicalCommitteeRepository'

export function MakeFindTechnicalCommitteeByDocumentUseCase() {
  const prismaTechnicalCommitteeRepository =
    new PrismaTechnicalCommitteeRepository()
  const findTechnicalCommitteeByDocumentUseCsae =
    new FindTechnicalCommitteeByDocumentUseCase(
      prismaTechnicalCommitteeRepository,
    )

  return findTechnicalCommitteeByDocumentUseCsae
}
