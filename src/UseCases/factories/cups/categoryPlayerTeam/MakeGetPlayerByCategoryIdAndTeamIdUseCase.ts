import { PrismaCategoryPlayerTeamRepository } from '@/repositories/prisma/PrismaCategoryPlayerTeamRepository'
import { GetPlayerByCategoryIdAndTeamIdUseCase } from '@/UseCases/cups/categoryPlayerTeam/GetPlayerByCategoryIdAndTeamIdUseCase'

export function MakeGetPlayerByCategoryIdAndTeamIdUseCase() {
  const prismaCategoryPlayerTeamRepository =
    new PrismaCategoryPlayerTeamRepository()
  const getPlayerByCategoryIdAndTeamIdUseCase =
    new GetPlayerByCategoryIdAndTeamIdUseCase(
      prismaCategoryPlayerTeamRepository,
    )

  return getPlayerByCategoryIdAndTeamIdUseCase
}
