import { GetTeamByCategoryIdUseCase } from '@/UseCases/cups/categoryTeam/GetTeamByCategoryIdUseCase'
import { PrismaTeamsRepository } from '@/repositories/prisma/PrismaTeamsRepository'

export function MakeGetTeamByCategoryIdUseCase() {
  const prismaTeamsRepository = new PrismaTeamsRepository()
  const getTeamsByCategoryIdUseCase = new GetTeamByCategoryIdUseCase(
    prismaTeamsRepository,
  )

  return getTeamsByCategoryIdUseCase
}
