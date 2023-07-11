import { GetCategoryWithTeamsToSiteByCupConfigIdUseCase } from '@/UseCases/cups/categoryTeam/GetCategoryWithTeamsToSiteByCupConfigIdUseCase'
import { PrismaCategoryTeamRepository } from '@/repositories/prisma/PrismaCategoryTeamRepository'

export function MakeGetCategoryWithTeamsToSiteByCupConfigIdUseCase() {
  const prismaCategoryTeamRepository = new PrismaCategoryTeamRepository()
  const getCategoryWithTeamsByCupConfigIdUseCase =
    new GetCategoryWithTeamsToSiteByCupConfigIdUseCase(
      prismaCategoryTeamRepository,
    )

  return getCategoryWithTeamsByCupConfigIdUseCase
}
