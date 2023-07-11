import { PrismaGamesRepository } from '@/repositories/prisma/PrismaGamesRepository'
import { FindOldFourGamesToSiteByCupConfigIdUseCase } from '@/UseCases/games/FindOldFourGamesToSiteByCupConfigIdUseCase'

export function MakeFindOldFourGamesToSiteByCupConfigIdUseCase() {
  const prismaGamesRepository = new PrismaGamesRepository()
  const findOldFourGamesToSiteByCupConfigIdUseCase =
    new FindOldFourGamesToSiteByCupConfigIdUseCase(prismaGamesRepository)

  return findOldFourGamesToSiteByCupConfigIdUseCase
}
