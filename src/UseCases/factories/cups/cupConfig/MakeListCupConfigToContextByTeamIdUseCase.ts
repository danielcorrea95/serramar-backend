import { ListCupConfigToContextByTeamIdUseCase } from '@/UseCases/cups/cupConfig/ListCupConfigToContextByTeamIdUseCase'
import { PrismaCupConfigRepositoy } from '@/repositories/prisma/PrismaCupConfigRepository'

export function MakeListCupConfigToContextByTeamIdUseCase() {
  const prismaCupConfigRepository = new PrismaCupConfigRepositoy()
  const listCupConfigByTeamIdUseCase =
    new ListCupConfigToContextByTeamIdUseCase(prismaCupConfigRepository)

  return listCupConfigByTeamIdUseCase
}
