import { PrismaStateRepository } from '@/repositories/prisma/PrismaStateRepository'
import { GetAllStateUseCase } from '../statesAndCities/GetAllStateUseCase'

export function MakeGetAllStateUseCase() {
  const prismaStateRepository = new PrismaStateRepository()
  const getAllStateUseCase = new GetAllStateUseCase(prismaStateRepository)

  return getAllStateUseCase
}
