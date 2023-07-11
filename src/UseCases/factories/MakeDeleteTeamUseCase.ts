import { PrismaTeamsRepository } from '@/repositories/prisma/PrismaTeamsRepository'
import { DeleteTeamUseCase } from '../teams/DeleteTeamUseCase'

export function MakeDeleteTeamUseCase() {
  const prismaTeamsRepository = new PrismaTeamsRepository()
  const deleteTeamUseCase = new DeleteTeamUseCase(prismaTeamsRepository)

  return deleteTeamUseCase
}
