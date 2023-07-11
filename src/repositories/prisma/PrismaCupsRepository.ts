import { prisma } from '@/lib/prisma'
import { Prisma, Cup } from '@prisma/client'
import { CupsRepository, cupIdResponse } from '../CupsRepository'

export class PrismaCupsRepository implements CupsRepository {
  async create(data: Prisma.CupUncheckedCreateInput): Promise<Cup> {
    const cup = await prisma.cup.create({
      data,
    })

    return cup
  }

  async findById(id: string): Promise<Cup | null> {
    const cup = await prisma.cup.findUnique({
      where: {
        id,
      },
    })

    return cup
  }

  async findBySubDomain(subDomain: string) {
    const cup = await prisma.cup.findUnique({
      where: {
        sub_domain: subDomain,
      },
    })

    return cup
  }

  async findCupConfigByTeamId(teamId: string): Promise<cupIdResponse[]> {
    const cup: cupIdResponse[] =
      await prisma.$queryRaw`SELECT cups.id, cups.name FROM category_team AS ct
    LEFT JOIN categories AS c ON c.id = ct.category_id
    LEFT JOIN cup_config AS cc ON cc.id = c.cup_config_id
    LEFT JOIN cups ON cups.id = cc.cup_id
    WHERE ct.team_id = ${teamId}
    GROUP BY cups.id
    `

    return cup
  }
}
