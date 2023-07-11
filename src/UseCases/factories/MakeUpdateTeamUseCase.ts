import { PrismaTeamsRepository } from '@/repositories/prisma/PrismaTeamsRepository'
import { UpdateTeamUseCase } from '../teams/UpdateTeamUseCase'

export function MakeUpdateTeamUseCase() {
  const prismaTeamsRepository = new PrismaTeamsRepository()
  const updateTeamUseCase = new UpdateTeamUseCase(prismaTeamsRepository)

  return updateTeamUseCase
}
