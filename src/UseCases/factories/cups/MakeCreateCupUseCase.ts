import { CreateCupUseCase } from '@/UseCases/cups/CreateCupUseCase'
import { PrismaCupsRepository } from '@/repositories/prisma/PrismaCupsRepository'

export function MakeCreateCupUseCase() {
  const prismaCupRepository = new PrismaCupsRepository()
  const createCupUseCase = new CreateCupUseCase(prismaCupRepository)

  return createCupUseCase
}
