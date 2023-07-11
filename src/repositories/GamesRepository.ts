import { Game, Prisma } from '@prisma/client'

export interface GamesProps {
  id: string
  date: Date
  categoryId: string
  categoryName: string
  teamAId: string
  teamA: string
  imageTeamA: string
  teamBId: string
  teamB: string
  imageTeamB: string
  groupId: string
  groupName: string
}

export interface GamesRepository {
  create(data: Prisma.GameUncheckedCreateInput): Promise<Game>
  findByCupConfigId(cupConfigId: string): Promise<GamesProps[]>
  findById(id: string): Promise<Game | null>

  nextFourGamesByCupConfigId(cupConfigId: string): Promise<GamesProps[]>
  oldFourGamesByCupConfigId(cupConfigId: string): Promise<GamesProps[]>
  gamesTodayByCupConfigId(cupConfigId: string): Promise<GamesProps[]>
  allgamesByCupConfigId(cupConfigId: string): Promise<GamesProps[]>
  findGameByIdAllData(id: string): Promise<GamesProps | null>
}
