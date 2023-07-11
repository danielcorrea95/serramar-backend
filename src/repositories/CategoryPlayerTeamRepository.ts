import { CategoryPlayerTeam, Player, Prisma } from '@prisma/client'

export interface PlayerProps {
  id: string
  name: string
  nickname: string
  date_birth: Date
  image: string
}

export interface CategoryPlayerTeamRepository {
  create(
    data: Prisma.CategoryPlayerTeamUncheckedCreateInput,
  ): Promise<CategoryPlayerTeam>
  delete(id: string): Promise<void>
  findByCategoryIdTeamIdPlayerId(
    categoryId: string,
    playerId: string,
    teamId: string,
  ): Promise<CategoryPlayerTeam | null>
  findPlayerActiveAnotherTeamThisCategoryId(
    categoryId: string,
    playerId: string,
    teamId: string,
  ): Promise<CategoryPlayerTeam | null>
  findById(id: string): Promise<CategoryPlayerTeam | null>
  uploadPlayerImage(linkId: string, filename: string): Promise<void>
  findPlayerByCategoryIdAndTeamId(
    categoryId: string,
    teamId: string,
  ): Promise<Player[]>

  findPlayersByCategoryIdAndTeamIdToSite(
    categoryId: string,
    teamId: string,
  ): Promise<PlayerProps[]>
}
