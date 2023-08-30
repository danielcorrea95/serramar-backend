import { prisma } from '@/lib/prisma'
import { CategoryPlayerTeam, Player, Prisma } from '@prisma/client'
import {
  CategoryPlayerTeamRepository,
  PlayerProps,
} from '../CategoryPlayerTeamRepository'

export class PrismaCategoryPlayerTeamRepository
  implements CategoryPlayerTeamRepository
{
  async create(data: Prisma.CategoryPlayerTeamUncheckedCreateInput) {
    const categoryPlayerTeam = await prisma.categoryPlayerTeam.create({ data })

    return categoryPlayerTeam
  }

  async delete(id: string): Promise<void> {
    await prisma.categoryPlayerTeam.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    })
  }

  async findByCategoryIdTeamIdPlayerId(
    categoryId: string,
    playerId: string,
    teamId: string,
  ) {
    const categoryPlayerTeam = await prisma.categoryPlayerTeam.findFirst({
      where: {
        category_id: categoryId,
        player_id: playerId,
        team_id: teamId,
        deleted: false,
      },
    })

    return categoryPlayerTeam
  }

  async findPlayerActiveAnotherTeamThisCategoryId(
    categoryId: string,
    playerId: string,
    teamId: string,
  ) {
    const categoryPlayerTeam = await prisma.categoryPlayerTeam.findFirst({
      where: {
        category_id: categoryId,
        player_id: playerId,
        active: true,
        NOT: {
          team_id: teamId,
        },
      },
    })

    return categoryPlayerTeam
  }

  async findById(id: string): Promise<CategoryPlayerTeam | null> {
    const link = prisma.categoryPlayerTeam.findFirst({
      where: {
        id,
      },
    })

    return link
  }

  async uploadPlayerImage(linkId: string, filename: string): Promise<void> {
    await prisma.categoryPlayerTeam.update({
      where: {
        id: linkId,
      },
      data: {
        avatar: filename,
      },
    })
  }

  async findPlayerByCategoryIdAndTeamId(
    categoryId: string,
    teamId: string,
  ): Promise<Player[]> {
    const players: Player[] =
      await prisma.$queryRaw`SELECT p.* FROM category_player_team AS cpt
                                    LEFT JOIN players AS p ON p.id = cpt.player_id
                                    WHERE cpt.category_id = ${categoryId} AND cpt.team_id = ${teamId} and cpt.deleted = false
                                    GROUP BY p.id`
    return players
  }

  async findPlayersByCategoryIdAndTeamIdToSite(
    categoryId: string,
    teamId: string,
  ): Promise<PlayerProps[]> {
    const players: PlayerProps[] =
      await prisma.$queryRaw`SELECT p.id, p.name, p.nickname, p.date_birth, cpt.avatar 
    FROM players AS p
    LEFT JOIN category_player_team AS cpt ON cpt.player_id = p.id
    WHERE cpt.team_id = ${teamId} AND cpt.category_id = ${categoryId} AND cpt.delete = false
    GROUP BY p.id, cpt.avatar
    `

    return players
  }
}
