import { Prisma, TechnicalCommittee } from '@prisma/client'
import {
  TechnicalCommitteeProps,
  TechnicalCommitteeRepository,
} from '../TechnicalCommitteeRepository'
import { prisma } from '@/lib/prisma'

interface TechnicalCommitteeQueryProps {
  id: string
  name: string
  document: string
  attachment: string
  technical_committee_type_name: string
}

export class PrismaTechnicalCommitteeRepository
  implements TechnicalCommitteeRepository
{
  async create(
    data: Prisma.TechnicalCommitteeCreateInput,
  ): Promise<TechnicalCommittee> {
    const technicalCommittee = await prisma.technicalCommittee.create({ data })

    return technicalCommittee
  }

  async findById(id: string): Promise<TechnicalCommittee | null> {
    const technicalCommittee = await prisma.technicalCommittee.findFirst({
      where: {
        id,
        deleted: false,
      },
    })

    return technicalCommittee
  }

  async findByDocument(document: string): Promise<TechnicalCommittee | null> {
    const technicalCommittee = await prisma.technicalCommittee.findFirst({
      where: {
        document,
        deleted: false,
      },
    })

    return technicalCommittee
  }

  async findByCategoryIdTeamId(
    categoryId: string,
    teamId: string,
  ): Promise<TechnicalCommitteeProps[]> {
    const technicalCommittee: TechnicalCommitteeQueryProps[] =
      await prisma.$queryRaw`
            SELECT tc.*, tct.name AS technical_committee_type_name FROM technical_committee AS tc
            LEFT JOIN category_team_technical_committee AS cttc ON cttc.technical_committee_id = tc.id
            LEFT JOIN technical_committee_types AS tct ON tct.id = cttc.technical_committee_type_id
            WHERE cttc.category_id = ${categoryId} AND cttc.team_id = ${teamId}
            GROUP BY tc.id, tct.name
            `
    const returnData: TechnicalCommitteeProps[] = []

    technicalCommittee.map((item) =>
      returnData.push({
        id: item.id,
        name: item.name,
        document: item.document,
        attachment: item.attachment,
        technicalCommitteeType: item.technical_committee_type_name,
      }),
    )

    return returnData
  }
}
