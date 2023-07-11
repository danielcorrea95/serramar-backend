import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { CardTypesRepository } from '../CardTypesRepository'

export class PrismaCardTypesRepository implements CardTypesRepository {
  async create(data: Prisma.CardTypeUncheckedCreateInput) {
    const cardType = await prisma.cardType.create({ data })

    return cardType
  }

  async findByCupId(cupConfigId: string) {
    const cardType = await prisma.cardType.findMany({
      where: {
        cup_config_id: cupConfigId,
      },
    })

    if (cardType) {
      return cardType
    }

    return null
  }

  async findByNameAndCupId(name: string, cupConfigId: string) {
    const cardType = await prisma.cardType.findFirst({
      where: {
        name,
        cup_config_id: cupConfigId,
      },
    })

    if (!cardType) {
      return null
    }

    return cardType
  }
}
