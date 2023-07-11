import { GetLinkIdByCategoryIdPlayerIdTeamIdUseCase } from '@/UseCases/cups/categoryPlayerTeam/GetLinkIdByCategoryIdPlayerIdTeamIdUseCase'
import { PrismaCategoryPlayerTeamRepository } from '@/repositories/prisma/PrismaCategoryPlayerTeamRepository'

export function MakeGetLinkIdByCategoryIdPlayerIdTeamIdUseCase() {
  const prismaCategoryPlayerTeamRepository =
    new PrismaCategoryPlayerTeamRepository()
  const getLinkIdByCategoryIdPlayerIdTeamIdUseCase =
    new GetLinkIdByCategoryIdPlayerIdTeamIdUseCase(
      prismaCategoryPlayerTeamRepository,
    )

  return getLinkIdByCategoryIdPlayerIdTeamIdUseCase
}
