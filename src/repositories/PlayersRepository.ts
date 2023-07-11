import { Player, Prisma } from '@prisma/client'

export interface PlayersRepository {
  create(data: Prisma.PlayerUncheckedCreateInput): Promise<Player>
  findByDocument(document: string): Promise<Player | null>
  findByid(id: string): Promise<Player | null>
  findAll(page: number, limitQueryPage: number): Promise<Player[]>
  update(data: Prisma.PlayerUncheckedCreateInput): Promise<Player>
  delete(id: string): Promise<void>

  findPlayersByCategoryIdAndTeamId(
    categoryId: string,
    teamId: string,
  ): Promise<Player[]>
}
