import { CreateTeamUseCase } from '@/UseCases/teams/CreateTeamUseCase'
import { PrismaTeamUserRepository } from '@/repositories/prisma/PrismaTeamUserRepository'
import { PrismaTeamsRepository } from '@/repositories/prisma/PrismaTeamsRepository'
import { PrismaUserRepository } from '@/repositories/prisma/PrismaUserRepository'

export function makeCreateTeamUseCase() {
  const teamsRepository = new PrismaTeamsRepository()
  const teamUserRepository = new PrismaTeamUserRepository()
  const usersRepository = new PrismaUserRepository()
  const useCase = new CreateTeamUseCase(
    teamsRepository,
    teamUserRepository,
    usersRepository,
  )

  return useCase
}
