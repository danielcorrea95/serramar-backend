import { PrismaPlayersRepository } from '@/repositories/prisma/PrismaPlayersRepository'
import { UpdatePlayerUseCase } from '../players/UpdatePlayerUseCase'

export function MakeUpdatePlayerUseCase() {
  const playersRepository = new PrismaPlayersRepository()
  const useCase = new UpdatePlayerUseCase(playersRepository)

  return useCase
}
