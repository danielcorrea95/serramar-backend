import { GameDetail, Prisma } from '@prisma/client'

export interface GameDetailsRepository {
  create(gameId: string, userId: string): Promise<GameDetail>

  findByGameId(gameId: string): Promise<GameDetail | null>
  updateGameDetailsByGameId(
    id: string,
    data: Prisma.GameDetailUncheckedCreateInput,
  ): Promise<GameDetail>
}
