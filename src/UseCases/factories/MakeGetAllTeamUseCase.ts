import { PrismaTeamsRepository } from '@/repositories/prisma/PrismaTeamsRepository'
import { GetAllTeamUseCase } from '../teams/GetAllTeamUseCase'

export function MakeGetAllTeamUseCase() {
  const prismaTeamsRepository = new PrismaTeamsRepository()
  const getAllTeamUseCase = new GetAllTeamUseCase(prismaTeamsRepository)

  return getAllTeamUseCase
}
