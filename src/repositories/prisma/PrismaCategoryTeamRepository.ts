import { CategoryTeam } from '@prisma/client'
import {
  CategoryTeamRepository,
  ReturnDataProps,
  TeamsProps,
} from '../CategoryTeamRepository'
import { prisma } from '@/lib/prisma'

export class PrismaCategoryTeamRepository implements CategoryTeamRepository {
  async create(categoryId: string, teamId: string) {
    await prisma.categoryTeam.create({
      data: {
        category_id: categoryId,
        team_id: teamId,
      },
    })
  }

  async findByCategoryIdAndTeamId(categoryId: string): Promise<CategoryTeam[]> {
    const categoryTeam = await prisma.categoryTeam.findMany({
      where: {
        category_id: categoryId,
      },
    })

    return categoryTeam
  }

  async deleteByCategoryId(categoryId: string): Promise<void> {
    await prisma.categoryTeam.deleteMany({
      where: {
        category_id: categoryId,
      },
    })
  }

  async getCategoryWithTeamsByCupConfigId(
    cupConfigId: string,
  ): Promise<ReturnDataProps[]> {
    const dataReturn: ReturnDataProps[] = []
    const categories = await prisma.category.findMany({
      where: {
        cup_config_id: cupConfigId,
      },
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: 'asc',
      },
    })

    for (const item of categories) {
      const teamsTemp: TeamsProps[] = []

      const teams: TeamsProps[] =
        await prisma.$queryRaw`SELECT t.id, t.name, t.image, t.phone, t.email, t.foundation_date, t.city_id, c.name AS city_name 
      FROM teams AS t
      LEFT JOIN category_team AS ct ON ct.team_id = t.id
      LEFT JOIN cities AS c ON c.id = t.city_id
      WHERE ct.category_id = ${item.id}
      ORDER BY t.name
      `

      for (const item of teams) {
        teamsTemp.push({
          id: item.id,
          city_id: item.city_id,
          city_name: item.city_name,
          email: item.email,
          foundation_date: item.foundation_date,
          image: item.image,
          name: item.name,
          phone: item.phone,
        })
      }

      dataReturn.push({
        id: item.id,
        name: item.name,
        Team: teamsTemp,
      })
    }

    return dataReturn
  }
}
