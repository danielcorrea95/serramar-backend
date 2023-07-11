import { Category, Prisma } from '@prisma/client'

export interface CategoryResponse {
  id: string
  name: string
}

export interface CategoriesRepository {
  create(data: Prisma.CategoryUncheckedCreateInput): Promise<Category>
  findById(id: string): Promise<Category | null>
  findByCupConfigId(cupConfigId: string): Promise<Category[]>
  findByCupConfigIdAndTeamId(
    cupConfigId: string,
    teamId: string,
  ): Promise<CategoryResponse[]>
}
