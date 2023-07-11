import { prisma } from '@/lib/prisma'
import { Prisma, Team } from '@prisma/client'
import {
  TeamToSiteById,
  TeamsRepository,
  TeamsResponse,
} from '../TeamsRepository'

export class PrismaTeamsRepository implements TeamsRepository {
  async create(data: Prisma.TeamUncheckedCreateInput) {
    const team = prisma.team.create({
      data,
    })

    return team
  }

  async findAll(page: number, limitQueryPage: number): Promise<Team[]> {
    const skipSearch = (page - 1) * limitQueryPage
    const teams = await prisma.team.findMany({
      where: {
        deleted: false,
      },
      skip: skipSearch,
      take: limitQueryPage,
    })

    return teams
  }

  async findById(id: string): Promise<Team | null> {
    const team = await prisma.team.findFirst({
      where: {
        id,
        deleted: false,
      },
    })

    return team
  }

  async update(data: Prisma.TeamUncheckedCreateInput): Promise<Team> {
    const team = await prisma.team.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        responsible: data.responsible,
        phone: data.phone,
        email: data.email,
        foundation_date: data.foundation_date,
        city_id: data.city_id,
      },
    })

    return team
  }

  async delete(id: string): Promise<void> {
    await prisma.team.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    })
  }

  async findByIds(ids: string[]): Promise<Team[]> {
    const teams = await prisma.team.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    })

    return teams
  }

  async findByCategoryId(categoryId: string): Promise<Team[]> {
    const teams = await prisma.team.findMany({
      include: {
        CategoryTeam: {
          where: {
            category_id: categoryId,
          },
        },
      },
    })

    return teams
  }

  async findTeamsByUserId(userId: string): Promise<TeamsResponse[]> {
    const teams: TeamsResponse[] =
      await prisma.$queryRaw`SELECT teams.id, teams.name FROM team_user AS tu
      LEFT JOIN teams AS teams ON teams.id = tu.team_id
      WHERE tu.user_id = ${userId}
      GROUP BY teams.id
    `

    return teams
  }

  async findByCupConfigId(cupConfigId: string): Promise<Team[]> {
    const teams: Team[] = await prisma.$queryRaw`SELECT t.* FROM teams AS t
                          LEFT JOIN category_team AS ct ON ct.team_id = t.id
                          LEFT JOIN categories as c ON c.id = ct.category_id
                          LEFT JOIN cup_config as cc ON cc.id = c.cup_config_id
                          where cc.id = ${cupConfigId} AND cc.deleted = false AND t.deleted = false
                          AND c.deleted = false
                          GROUP BY t.id`
    return teams
  }

  async uploadImage(teamId: string, imageFile: string): Promise<void> {
    await prisma.team.update({
      where: {
        id: teamId,
      },
      data: {
        image: imageFile,
      },
    })
  }

  async findTeamByIdToSite(teamId: string): Promise<TeamToSiteById> {
    const team: TeamToSiteById =
      await prisma.$queryRaw`SELECT t.id, t.name, t.responsible, t.phone,
      t.email, t.foundation_date, t.image,
      c.name as cityName 
      FROM teams as t
    LEFT JOIN cities AS c ON c.id = t.city_id
    WHERE t.id = ${teamId}
    `

    return team
  }
}
