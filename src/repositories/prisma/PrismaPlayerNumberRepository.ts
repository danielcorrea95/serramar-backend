import { PlayerNumber, Prisma } from '@prisma/client'
import { PlayerNumberRepository } from '../PlayerNumberRepository'
import { prisma } from '@/lib/prisma'

export class PrismaPlayerNumberRepository implements PlayerNumberRepository {
  async create(data: Prisma.PlayerNumberUncheckedCreateInput): Promise<void> {
    await prisma.playerNumber.create({ data })
  }

  async findByPlayerIdAndGameId(
    playerId: string,
    gameId: string,
  ): Promise<PlayerNumber | null> {
    const playerNumber = await prisma.playerNumber.findFirst({
      where: {
        game_id: gameId,
        player_id: playerId,
      },
    })

    return playerNumber
  }

  async updateNumber(id: string, number: number): Promise<void> {
    await prisma.playerNumber.update({
      where: {
        id,
      },
      data: {
        number,
      },
    })
  }
}
