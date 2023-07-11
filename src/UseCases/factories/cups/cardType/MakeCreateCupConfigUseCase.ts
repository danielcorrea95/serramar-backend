import { CreateCupConfigUseCase } from '@/UseCases/cups/cupConfig/CreateCupConfigUseCase'
import { PrismaCupConfigRepositoy } from '@/repositories/prisma/PrismaCupConfigRepository'

export function MakeCreateCupConfigUseCase() {
  const prismaCupConfigRepository = new PrismaCupConfigRepositoy()
  const createCupConfigUseCase = new CreateCupConfigUseCase(
    prismaCupConfigRepository,
  )

  return createCupConfigUseCase
}
