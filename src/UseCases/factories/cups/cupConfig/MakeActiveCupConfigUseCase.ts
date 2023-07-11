import { ActiveCupUseCase } from '@/UseCases/cups/cupConfig/ActiveCupConfigUseCase'
import { PrismaCupConfigRepositoy } from '@/repositories/prisma/PrismaCupConfigRepository'

export function MakeActiveCupConfigUseCase() {
  const prismaCupConfigRepository = new PrismaCupConfigRepositoy()
  const activeCupConfigUseCase = new ActiveCupUseCase(prismaCupConfigRepository)

  return activeCupConfigUseCase
}
