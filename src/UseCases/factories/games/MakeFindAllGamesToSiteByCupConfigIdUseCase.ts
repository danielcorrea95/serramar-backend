import { FindAllGamesToSiteByCupConfigIdUseCase } from '@/UseCases/games/FindAllGamesToSiteByCupConfigIdUseCase'
import { PrismaGamesRepository } from '@/repositories/prisma/PrismaGamesRepository'

export function MakeFindAllGamesToSiteByCupConfigIdUseCase() {
  const prismaGamesRepository = new PrismaGamesRepository()
  const findAllGamesByCupConfigIdUseCase =
    new FindAllGamesToSiteByCupConfigIdUseCase(prismaGamesRepository)

  return findAllGamesByCupConfigIdUseCase
}
