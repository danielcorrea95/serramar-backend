import { UpdateGameDetailsByIdUseCase } from '@/UseCases/games/scoresheet/UpdateGameDetailsByIdUseCase'
import { PrismaGameDetailsRepository } from '@/repositories/prisma/PrismaGameDetailsRepository'
import { PrismaGamesRepository } from '@/repositories/prisma/PrismaGamesRepository'

export function MakeUpdateGameDetailsByIdUseCase() {
  const prismaGameDetailsRepository = new PrismaGameDetailsRepository()
  const prismaGamesRepository = new PrismaGamesRepository()
  const updateGameDetailsByIdUseCase = new UpdateGameDetailsByIdUseCase(
    prismaGameDetailsRepository,
    prismaGamesRepository,
  )

  return updateGameDetailsByIdUseCase
}
