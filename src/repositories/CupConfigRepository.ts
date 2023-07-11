import { CupConfig, Prisma } from '@prisma/client'

export interface cupIdResponse {
  id: string
  name: string
}

export interface CupConfigRepository {
  create(data: Prisma.CupConfigUncheckedCreateInput): Promise<CupConfig>
  findById(id: string): Promise<CupConfig | null>
  activeCup(cupConfigId: string, active: boolean): Promise<CupConfig>
  findCupByBetweenDate(cupId: string): Promise<CupConfig | null>
  findCupActiveButOutOfPeriod(cupId: string): Promise<CupConfig | null>
  findCupConfigByTeamId(teamId: string): Promise<cupIdResponse[]>
}
