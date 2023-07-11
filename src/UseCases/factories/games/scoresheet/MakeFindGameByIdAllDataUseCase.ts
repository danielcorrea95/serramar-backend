import { FindGameByIdAllDataUseCase } from '@/UseCases/games/scoresheet/FindGameByIdAllDataUseCase'
import { PrismaGamesRepository } from '@/repositories/prisma/PrismaGamesRepository'

export function MakeFindGameByIdAllDataUseCase() {
  const prismaGamesRepository = new PrismaGamesRepository()
  const findGameByIdAllDataUseCase = new FindGameByIdAllDataUseCase(
    prismaGamesRepository,
  )

  return findGameByIdAllDataUseCase
}
