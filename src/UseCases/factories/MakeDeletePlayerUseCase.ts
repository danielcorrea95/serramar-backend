import { PrismaPlayersRepository } from '@/repositories/prisma/PrismaPlayersRepository'
import { DeletePlayerUseCase } from '../players/DeletePlayerUseCase'

export function MakeDeletePlayerUseCase() {
  const playersRepository = new PrismaPlayersRepository()
  const useCase = new DeletePlayerUseCase(playersRepository)

  return useCase
}
