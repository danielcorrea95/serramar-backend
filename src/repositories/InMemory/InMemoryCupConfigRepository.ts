import { Prisma, CupConfig } from '@prisma/client'
import { CupConfigRepository } from '../CupConfigRepository'

export class InMemoryCupConfigRepository implements CupConfigRepository {
  public items: CupConfig[] = []

  async create(data: Prisma.CupConfigUncheckedCreateInput) {
    const cupConfig = {
      id: data.id ? data.id : 'cup-config-id-1',
      cup_id: data.cup_id,
      start_date: new Date(data.start_date),
      end_date: new Date(data.end_date),
      amount_players: data.amount_players,
      active: data.active ? data.active : false,
      regulation: data.regulation,
      deleted: false,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(cupConfig)

    return cupConfig
  }

  async findCupByBetweenDate(cupId: string) {
    let cupConfigActive = null

    this.items.forEach((item) => {
      if (
        item.cup_id === cupId &&
        item.active === true &&
        item.start_date <= new Date('2023-03-22') &&
        item.end_date >= new Date('2023-03-22')
      ) {
        cupConfigActive = item
      }
    })

    if (!cupConfigActive) {
      return null
    }

    return cupConfigActive
  }

  async activeCup(cupConfigId: string, active: boolean) {
    const cup = this.items.find((item) => item.id === cupConfigId)

    if (cup) {
      cup.active = active
      return cup
    }

    return this.items[0]
  }

  async findCupActiveButOutOfPeriod(cupId: string) {
    const cupConfig = this.items.find(
      (item) =>
        item.cup_id === cupId &&
        item.active === true &&
        (item.start_date > new Date('2023-03-22') ||
          item.end_date < new Date('2023-03-22')),
    )

    if (!cupConfig) {
      return null
    }

    return cupConfig
  }
}
