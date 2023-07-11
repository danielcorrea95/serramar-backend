import { PrismaPlayersRepository } from '@/repositories/prisma/PrismaPlayersRepository'
import { GetAllPlayerUseCase } from '../players/GetAllPlayerUseCase'

export function MakeGetAllPlayerUseCase() {
  const playersRepository = new PrismaPlayersRepository()
  const useCase = new GetAllPlayerUseCase(playersRepository)

  return useCase
}
