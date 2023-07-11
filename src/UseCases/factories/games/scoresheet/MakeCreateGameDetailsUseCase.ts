import { CreateGameDetailsUseCase } from '@/UseCases/games/scoresheet/CreateGameDetailsUseCase'
import { PrismaGameDetailsRepository } from '@/repositories/prisma/PrismaGameDetailsRepository'

export function MakeCreateGameDetailsUseCase() {
  const prismaGameDetailRepository = new PrismaGameDetailsRepository()
  const createGameDetailsUseCase = new CreateGameDetailsUseCase(
    prismaGameDetailRepository,
  )

  return createGameDetailsUseCase
}
