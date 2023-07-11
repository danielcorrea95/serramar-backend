import { ListTeamsToContextByUserIdUseCase } from '@/UseCases/teams/ListTeamsToContextByUserIdUseCase'
import { PrismaTeamsRepository } from '@/repositories/prisma/PrismaTeamsRepository'

export function MakeListTeamsToContextByUserIdUseCase() {
  const prismaTeamsRepository = new PrismaTeamsRepository()
  const listTeamsByUserIdUseCase = new ListTeamsToContextByUserIdUseCase(
    prismaTeamsRepository,
  )

  return listTeamsByUserIdUseCase
}
