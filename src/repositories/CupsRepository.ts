import { Cup, Prisma } from '@prisma/client'

export interface cupIdResponse {
  id: string
  name: string
}

export interface CupsRepository {
  create(data: Prisma.CupUncheckedCreateInput): Promise<Cup>
  findBySubDomain(subDomain: string): Promise<Cup | null>
  findCupConfigByTeamId(teamId: string): Promise<cupIdResponse[]>
  findById(id: string): Promise<Cup | null>
}
