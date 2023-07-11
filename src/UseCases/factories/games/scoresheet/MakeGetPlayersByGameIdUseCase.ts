import { GetPlayersByGameIdUseCase } from '@/UseCases/games/scoresheet/GetPlayersByGameIdUseCase'
import { PrismaGamesRepository } from '@/repositories/prisma/PrismaGamesRepository'
import { PrismaPlayersRepository } from '@/repositories/prisma/PrismaPlayersRepository'
import { PrismaTeamsRepository } from '@/repositories/prisma/PrismaTeamsRepository'
import { PrismaTechnicalCommitteeRepository } from '@/repositories/prisma/PrismaTechnicalCommitteeRepository'

export function MakeGetPlayersByGameIdUseCase() {
  const prismaGamesRepository = new PrismaGamesRepository()
  const prismaTeamsRepository = new PrismaTeamsRepository()
  const prismatechnicalCommitteeRepository =
    new PrismaTechnicalCommitteeRepository()
  const prismaPlayersRepository = new PrismaPlayersRepository()
  const getPlayersByGameIdUseCase = new GetPlayersByGameIdUseCase(
    prismaGamesRepository,
    prismaTeamsRepository,
    prismatechnicalCommitteeRepository,
    prismaPlayersRepository,
  )

  return getPlayersByGameIdUseCase
}
