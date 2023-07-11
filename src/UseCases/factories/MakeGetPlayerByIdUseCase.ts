import { PrismaPlayersRepository } from '@/repositories/prisma/PrismaPlayersRepository'
import { GetPlayerByIdUseCase } from '../players/GetPlayerByIdUseCase'

export function MakeGetPlayerByIdUseCase() {
  const playersRepository = new PrismaPlayersRepository()
  const useCase = new GetPlayerByIdUseCase(playersRepository)

  return useCase
}
