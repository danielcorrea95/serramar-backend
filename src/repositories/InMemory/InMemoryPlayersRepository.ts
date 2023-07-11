import { Prisma, Player } from '@prisma/client'
import { PlayersRepository } from '../PlayersRepository'

export class InMemoryPlayersRepository implements PlayersRepository {
  public items: Player[] = []

  async create(data: Prisma.PlayerUncheckedCreateInput) {
    const player = {
      id: 'player-1',
      name: data.name,
      nickname: data.nickname ? data.nickname : null,
      date_birth: data.date_birth ? new Date(data.date_birth) : null,
      document: data.document,
      phone: data.phone ? data.phone : null,
      deleted: false,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(player)

    return player
  }

  async findByDocument(document: string) {
    const player = this.items.find((item) => item.document === document)

    if (!player) {
      return null
    }

    return player
  }
}
