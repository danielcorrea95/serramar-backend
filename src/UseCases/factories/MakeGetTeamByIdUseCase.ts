import { PrismaTeamsRepository } from '@/repositories/prisma/PrismaTeamsRepository'
import { GetTeamByIdUseCase } from '../teams/GetTeamByIdUseCase'

export function MakeGetTeamByIdUseCase() {
  const prismaTeamsRepository = new PrismaTeamsRepository()
  const getTeamByIdUseCase = new GetTeamByIdUseCase(prismaTeamsRepository)

  return getTeamByIdUseCase
}
