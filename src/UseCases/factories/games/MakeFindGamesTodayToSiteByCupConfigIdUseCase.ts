import { FindGamesTodayToSiteByCupConfigIdUseCase } from '@/UseCases/games/FindGamesTodayToSiteByCupConfigIdUseCase'
import { PrismaGamesRepository } from '@/repositories/prisma/PrismaGamesRepository'

export function MakeFindGamesTodayToSiteByCupConfigIdUseCase() {
  const prismaGamesRepository = new PrismaGamesRepository()
  const findGamesTodayByCupConfigIdUseCase =
    new FindGamesTodayToSiteByCupConfigIdUseCase(prismaGamesRepository)

  return findGamesTodayByCupConfigIdUseCase
}
