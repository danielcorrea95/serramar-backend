import { Prisma, CardType } from '@prisma/client'
import { CardTypesRepository } from '../CardTypesRepository'

export class InMemoryCardTypesRepository implements CardTypesRepository {
  public items: CardType[] = []

  async create(data: Prisma.CardTypeUncheckedCreateInput) {
    const cardType = {
      id: 'card-id',
      cup_config_id: data.cup_config_id,
      name: data.name,
      points: data.points,
      deleted: false,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(cardType)

    return cardType
  }

  async findByCupId(cupConfigId: string) {
    const cardType: CardType[] = []
    this.items.forEach((item) => {
      if (item.cup_config_id === cupConfigId) {
        cardType.push(item)
      }
    })

    if (cardType.length > 0) {
      return cardType
    }

    return null
  }

  async findByNameAndCupId(name: string, cupConfigId: string) {
    const cardType = this.items.find(
      (item) => item.name === name && item.cup_config_id === cupConfigId,
    )

    if (!cardType) return null

    return cardType
  }
}
