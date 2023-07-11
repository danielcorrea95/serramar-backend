import { prisma } from '@/lib/prisma'
import { TechnicalCommitteeTypes } from '@prisma/client'
import { TechnicalCommitteeTypesRepository } from '../TechnicalCommitteeTypesRepository'

export class PrismaTechnicalCommitteeTypesRepository
  implements TechnicalCommitteeTypesRepository
{
  async listAll(): Promise<TechnicalCommitteeTypes[]> {
    const types = await prisma.technicalCommitteeTypes.findMany({
      where: {
        deleted: false,
      },
    })

    return types
  }
}
