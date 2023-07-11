import { GetTeamByIdToSiteUseCase } from '@/UseCases/teams/GetTeamByIdToSiteUseCase'
import { PrismaTeamsRepository } from '@/repositories/prisma/PrismaTeamsRepository'

export function MakeGetTeamByIdToSiteUseCase() {
  const teamsRepository = new PrismaTeamsRepository()
  const useCase = new GetTeamByIdToSiteUseCase(teamsRepository)

  return useCase
}
