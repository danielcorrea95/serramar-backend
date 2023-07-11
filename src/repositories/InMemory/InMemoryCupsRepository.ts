import { Prisma, Cup } from '@prisma/client'
import { CupsRepository } from '../CupsRepository'

export class InMemoryCupsRepository implements CupsRepository {
  public items: Cup[] = []

  async create(data: Prisma.CupUncheckedCreateInput) {
    const cup = {
      id: 'cup-1',
      company_id: data.company_id,
      name: data.name,
      sub_domain: data.sub_domain,
      deleted: false,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(cup)

    return cup
  }

  async findBySubDomain(subDomain: string) {
    const cup = this.items.find((item) => item.sub_domain === subDomain)

    if (!cup) {
      return null
    }

    return cup
  }
}
