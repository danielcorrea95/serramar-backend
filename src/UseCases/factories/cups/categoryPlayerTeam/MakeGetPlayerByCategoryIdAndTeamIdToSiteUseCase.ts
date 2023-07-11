import { GetPlayerByCategoryIdAndTeamIdToSiteUseCase } from '@/UseCases/cups/categoryPlayerTeam/GetPlayerByCategoryIdAndTeamIdToSiteUseCase'
import { PrismaCategoryPlayerTeamRepository } from '@/repositories/prisma/PrismaCategoryPlayerTeamRepository'

export function MakeGetPlayerByCategoryIdAndTeamIdToSiteUseCase() {
  const prismaCategoryPlayerTeamRepository =
    new PrismaCategoryPlayerTeamRepository()
  const getPlayerByCategoryIdAndTeamIdToSiteUseCase =
    new GetPlayerByCategoryIdAndTeamIdToSiteUseCase(
      prismaCategoryPlayerTeamRepository,
    )

  return getPlayerByCategoryIdAndTeamIdToSiteUseCase
}
