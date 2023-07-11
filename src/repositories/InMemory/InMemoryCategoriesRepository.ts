import { Prisma, Category } from '@prisma/client'
import { CategoriesRepository } from '../CategoriesRepository'

export class InMemoryCategoriesRepository implements CategoriesRepository {
  public items: Category[] = []

  async create(data: Prisma.CategoryUncheckedCreateInput): Promise<Category> {
    const category = {
      id: 'category-1',
      cup_config_id: data.cup_config_id,
      name: data.name,
      amount_teams: data.amount_teams,
      amount_groups: data.amount_groups,
      amount_next_phase: data.amount_next_phase,
      deleted: false,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(category)
    return category
  }
}
