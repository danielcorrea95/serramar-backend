import { CardType, Prisma } from '@prisma/client'

export interface CardTypesRepository {
  create(data: Prisma.CardTypeUncheckedCreateInput): Promise<CardType>
  findByCupId(cupConfigId: string): Promise<CardType[] | null>
  findByNameAndCupId(
    name: string,
    cupConfigId: string,
  ): Promise<CardType | null>
}
