import { prisma } from '@/lib/prisma'
import { CupConfig, Prisma } from '@prisma/client'
import { CupConfigRepository, cupIdResponse } from '../CupConfigRepository'

export class PrismaCupConfigRepositoy implements CupConfigRepository {
  async create(data: Prisma.CupConfigUncheckedCreateInput) {
    const cupConfig = await prisma.cupConfig.create({
      data,
    })

    return cupConfig
  }

  async findById(id: string): Promise<CupConfig | null> {
    const cupConfig = await prisma.cupConfig.findFirst({
      where: {
        id,
      },
    })

    return cupConfig
  }

  async activeCup(cupConfigId: string, active: boolean) {
    const cupConfig = await prisma.cupConfig.update({
      where: { id: cupConfigId },
      data: { active },
    })

    return cupConfig
  }

  async findCupByBetweenDate(cupId: string) {
    const cupConfig = await prisma.cupConfig.findFirst({
      where: {
        cup_id: cupId,
        active: true,
        start_date: {
          gte: new Date(),
        },
        end_date: {
          lte: new Date(),
        },
      },
    })

    return cupConfig
  }

  async findCupActiveButOutOfPeriod(cupId: string) {
    const cupConfig = await prisma.cupConfig.findFirst({
      where: {
        cup_id: cupId,
        active: true,
        OR: {
          start_date: {
            gt: new Date(),
          },
          end_date: {
            lt: new Date(),
          },
        },
      },
    })

    return cupConfig
  }

  async findCupConfigByTeamId(teamId: string): Promise<cupIdResponse[]> {
    const cup: cupIdResponse[] =
      await prisma.$queryRaw`SELECT cc.id, cc.name FROM category_team AS ct
  LEFT JOIN categories AS c ON c.id = ct.category_id
  LEFT JOIN cup_config AS cc ON cc.id = c.cup_config_id
  WHERE ct.team_id = ${teamId}
  GROUP BY cc.id
  `

    return cup
  }
}
