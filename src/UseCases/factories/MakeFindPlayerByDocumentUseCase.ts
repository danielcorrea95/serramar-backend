import { PrismaPlayersRepository } from '@/repositories/prisma/PrismaPlayersRepository'
import { FindPlayerByDocumentUseCase } from '../players/FindPlayerByDocumentUseCase'

export function MakeFindPlayerByDocumentUseCase() {
  const prismaPlayersRepository = new PrismaPlayersRepository()
  const findPlayersByDocumentUseCase = new FindPlayerByDocumentUseCase(
    prismaPlayersRepository,
  )

  return findPlayersByDocumentUseCase
}
