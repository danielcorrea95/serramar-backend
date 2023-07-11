import { prisma } from '@/lib/prisma'
import { Category, Prisma } from '@prisma/client'
import { CategoriesRepository, CategoryResponse } from '../CategoriesRepository'

export class PrismaCategoriesRepository implements CategoriesRepository {
  async create(data: Prisma.CategoryUncheckedCreateInput) {
    const category = await prisma.category.create({ data })

    return category
  }

  async findById(id: string): Promise<Category | null> {
    const category = await prisma.category.findFirst({
      where: {
        id,
        deleted: false,
      },
    })

    return category
  }

  async findByCupConfigId(cupConfigId: string): Promise<Category[]> {
    const categories = await prisma.category.findMany({
      where: {
        cup_config_id: cupConfigId,
      },
    })

    return categories
  }

  async findByCupConfigIdAndTeamId(
    cupConfigId: string,
    teamId: string,
  ): Promise<CategoryResponse[]> {
    const categories: CategoryResponse[] =
      await prisma.$queryRaw`SELECT c.id, c.name FROM categories AS c
    LEFT JOIN category_team AS ct ON ct.category_id = c.id
    LEFT JOIN cup_config AS cc ON cc.id = c.cup_config_id
    WHERE ct.team_id = ${teamId} And c.cup_config_id = ${cupConfigId} AND cc.active = true
    GROUP BY c.id`

    return categories
  }
}
