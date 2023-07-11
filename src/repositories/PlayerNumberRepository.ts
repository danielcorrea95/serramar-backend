import { PlayerNumber, Prisma } from '@prisma/client'

export interface PlayerNumberRepository {
  create(data: Prisma.PlayerNumberUncheckedCreateInput): Promise<void>
  findByPlayerIdAndGameId(
    playerId: string,
    gameId: string,
  ): Promise<PlayerNumber | null>

  updateNumber(id: string, number: number): Promise<void>
}
