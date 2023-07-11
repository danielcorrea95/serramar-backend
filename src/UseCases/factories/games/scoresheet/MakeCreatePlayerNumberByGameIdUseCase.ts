import { CreatePlayerNumberByGameIdUseCase } from '@/UseCases/games/scoresheet/CreatePlayerNumberByGameIdUseCase'
import { PrismaPlayerNumberRepository } from '@/repositories/prisma/PrismaPlayerNumberRepository'

export function MakeCreatePlayerNumberByGameIdUseCase() {
  const prismaPlayerNumberRepository = new PrismaPlayerNumberRepository()
  const createPlayerNumberByGameIdUseCase =
    new CreatePlayerNumberByGameIdUseCase(prismaPlayerNumberRepository)

  return createPlayerNumberByGameIdUseCase
}
