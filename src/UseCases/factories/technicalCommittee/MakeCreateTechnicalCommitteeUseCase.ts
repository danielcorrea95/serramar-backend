import { CreateTechnicalCommitteeUseCase } from '@/UseCases/technicalCommittee/CreateTechnicalCommitteeUseCase'
import { PrismaTechnicalCommitteeRepository } from '@/repositories/prisma/PrismaTechnicalCommitteeRepository'

export function MakeCreateTechnicalCommitteeUseCase() {
  const prismaTechnicalCommitteeRepository =
    new PrismaTechnicalCommitteeRepository()
  const createTechnicalCommitteeUseCase = new CreateTechnicalCommitteeUseCase(
    prismaTechnicalCommitteeRepository,
  )

  return createTechnicalCommitteeUseCase
}
