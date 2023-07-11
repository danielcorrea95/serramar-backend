import { CreatePlayerUseCase } from '@/UseCases/players/CreatePlayerUseCase'
import { PrismaPlayersRepository } from '@/repositories/prisma/PrismaPlayersRepository'

export function makeCreatePlayerUseCase() {
  const playersRepository = new PrismaPlayersRepository()
  const useCase = new CreatePlayerUseCase(playersRepository)

  return useCase
}
