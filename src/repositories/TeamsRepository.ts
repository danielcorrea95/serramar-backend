import { Prisma, Team } from '@prisma/client'

export interface TeamsResponse {
  id: string
  name: string
}

export interface TeamToSiteById {
  id: string
  name: string
  responsible: string
  phone: string
  email: string
  foundation_date: Date
  image: string
  cityName: string
}

export interface TeamsRepository {
  create(data: Prisma.TeamUncheckedCreateInput): Promise<Team>
  findAll(page: number, limitQueryPage: number): Promise<Team[]>
  findById(id: string): Promise<Team | null>
  findByIds(ids: string[]): Promise<Team[]>
  update(data: Prisma.TeamUncheckedCreateInput): Promise<Team>
  delete(id: string): Promise<void>
  findByCategoryId(categoryId: string): Promise<Team[]>
  findTeamsByUserId(userId: string): Promise<TeamsResponse[]>
  uploadImage(teamId: string, imageFile: string): Promise<void>
  findByCupConfigId(cupConfigId: string): Promise<Team[]>

  findTeamByIdToSite(teamId: string): Promise<TeamToSiteById>
}
