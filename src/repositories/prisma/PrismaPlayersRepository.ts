import { prisma } from '@/lib/prisma'
import { Player, Prisma } from '@prisma/client'
import { PlayersRepository } from '../PlayersRepository'

export class PrismaPlayersRepository implements PlayersRepository {
  async create(data: Prisma.PlayerUncheckedCreateInput) {
    const player = await prisma.player.create({ data })

    return player
  }

  async findByDocument(document: string) {
    const player = await prisma.player.findFirst({
      where: {
        document,
        deleted: false,
      },
    })

    return player
  }

  async findByid(id: string): Promise<Player | null> {
    const player = await prisma.player.findFirst({
      where: {
        id,
        deleted: false,
      },
    })
    return player
  }

  async findAll(page: number, limitQueryPage: number): Promise<Player[]> {
    const skipSearch = (page - 1) * limitQueryPage
    const players = await prisma.player.findMany({
      where: {
        deleted: false,
      },
      skip: skipSearch,
      take: limitQueryPage,
    })

    return players
  }

  async update(data: Prisma.PlayerUncheckedCreateInput): Promise<Player> {
    const player = await prisma.player.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        nickname: data.nickname,
        phone: data.phone,
        document: data.document,
      },
    })

    return player
  }

  async delete(id: string): Promise<void> {
    await prisma.player.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    })
  }

  async findPlayersByCategoryIdAndTeamId(
    categoryId: string,
    teamId: string,
  ): Promise<Player[]> {
    const players: Player[] =
      await prisma.$queryRaw`SELECT p.* FROM players AS p
    LEFT JOIN category_player_team AS cpt ON cpt.player_id = p.id
    WHERE cpt.category_id = ${categoryId} AND cpt.team_id = ${teamId} AND cpt.deleted = false
    GROUP BY p.id
    ORDER BY p.name
    `

    return players
  }
}
