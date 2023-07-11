import { PrismaCategoryPlayerTeamRepository } from '@/repositories/prisma/PrismaCategoryPlayerTeamRepository'
import { LinkCategoryPlayerTeamUseCase } from '@/UseCases/cups/categoryPlayerTeam/LinkCategoryPlayerTeamUseCase'

export function MakeLinkCategoryPlayerTeamUseCase() {
  const categoryPlayerTeamRepository = new PrismaCategoryPlayerTeamRepository()
  const useCase = new LinkCategoryPlayerTeamUseCase(
    categoryPlayerTeamRepository,
  )

  return useCase
}
