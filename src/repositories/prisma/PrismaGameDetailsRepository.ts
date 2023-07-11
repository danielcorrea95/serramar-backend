import { GameDetail, Prisma } from '@prisma/client'
import { GameDetailsRepository } from '../GameDetailsRepository'
import { prisma } from '@/lib/prisma'

export class PrismaGameDetailsRepository implements GameDetailsRepository {
  async create(gameId: string, userId: string): Promise<GameDetail> {
    const gameDetail = await prisma.gameDetail.create({
      data: {
        game_id: gameId,
        user_id: userId,
      },
    })

    return gameDetail
  }

  async findByGameId(gameId: string): Promise<GameDetail | null> {
    const gameDetail = await prisma.gameDetail.findFirst({
      where: {
        game_id: gameId,
        deleted: false,
      },
    })

    return gameDetail
  }

  async updateGameDetailsByGameId(
    id: string,
    data: Prisma.GameDetailUncheckedCreateInput,
  ): Promise<GameDetail> {
    const gameDetail = await prisma.gameDetail.update({
      where: {
        id,
      },
      data: {
        first_period_start: data.first_period_start,
        first_period_end: data.first_period_end,
        second_period_start: data.second_period_start,
        second_period_end: data.second_period_end,
        extra_period_start: data.extra_period_start,
        extra_period_end: data.extra_period_end,
        obs: data.obs,
        user_id: data.user_id,
        published: data.published,
      },
    })

    return gameDetail
  }
}
