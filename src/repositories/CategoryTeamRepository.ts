import { CategoryTeam } from '@prisma/client'

export interface TeamsProps {
  id: string
  name: string
  image: string | null
  phone: string | null
  email: string | null
  foundation_date: Date | null
  city_id: number
  city_name: string
}

export interface ReturnDataProps {
  id: string
  name: string
  Team: TeamsProps[]
}

export interface CategoryTeamRepository {
  create(categoryId: string, teamId: string): Promise<void>
  findByCategoryIdAndTeamId(categoryId: string): Promise<CategoryTeam[]>
  deleteByCategoryId(categoryId: string): Promise<void>

  getCategoryWithTeamsByCupConfigId(
    cupConfigId: string,
  ): Promise<ReturnDataProps[]>
}
