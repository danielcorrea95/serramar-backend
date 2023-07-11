import { FindGamesByCupConfigIdUseCase } from '@/UseCases/games/FindGamesByCupConfigIdUseCase'
import { PrismaGamesRepository } from '@/repositories/prisma/PrismaGamesRepository'

export function MakeFindGamesByCupConfigIdUseCase() {
  const prismaGamesRepository = new PrismaGamesRepository()
  const findGamesByCupConfigIdUseCase = new FindGamesByCupConfigIdUseCase(
    prismaGamesRepository,
  )

  return findGamesByCupConfigIdUseCase
}
