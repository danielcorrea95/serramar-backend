import { DeleteLinkByPlayerIdTeamIdCategoryIdUseCase } from '@/UseCases/cups/categoryPlayerTeam/DeleteLinkByPlayerIdTeamIdCategoryIdUseCase'
import { PrismaCategoryPlayerTeamRepository } from '@/repositories/prisma/PrismaCategoryPlayerTeamRepository'

export function MakeDeleteLinkByPlayerIdTeamIdCategoryIdUseCase() {
  const categoryPlayerTeamRepository = new PrismaCategoryPlayerTeamRepository()
  const useCase = new DeleteLinkByPlayerIdTeamIdCategoryIdUseCase(
    categoryPlayerTeamRepository,
  )

  return useCase
}
