import { CreateCardTypeUseCase } from '@/UseCases/cups/cardType/CreateCardTypeUseCase'
import { PrismaCardTypesRepository } from '@/repositories/prisma/PrismaCardTypesRepository'

export function MakeCreateCardTypeUseCase() {
  const prismaCardTypeRepository = new PrismaCardTypesRepository()
  const createCardTypeUseCase = new CreateCardTypeUseCase(
    prismaCardTypeRepository,
  )

  return createCardTypeUseCase
}
