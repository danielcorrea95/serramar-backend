import { PrismaGamesRepository } from '@/repositories/prisma/PrismaGamesRepository'
import { FindNextFourGamesToSiteByCupConfigIdUseCase } from '@/UseCases/games/FindNextFourGamesToSiteByCupConfigIdUseCase'

export function MakeFindNextFourGamesToSiteByCupConfigIdUseCase() {
  const prismaGamesRepository = new PrismaGamesRepository()
  const findNextFourGamesToSiteByCupConfigIdUseCase =
    new FindNextFourGamesToSiteByCupConfigIdUseCase(prismaGamesRepository)

  return findNextFourGamesToSiteByCupConfigIdUseCase
}
