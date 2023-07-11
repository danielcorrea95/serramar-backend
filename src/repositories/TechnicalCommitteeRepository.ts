import { Prisma, TechnicalCommittee } from '@prisma/client'

export interface TechnicalCommitteeProps {
  id: string
  name: string
  document: string
  attachment: string
  technicalCommitteeType: string
}

export interface TechnicalCommitteeRepository {
  create(
    data: Prisma.TechnicalCommitteeCreateInput,
  ): Promise<TechnicalCommittee>
  findById(id: string): Promise<TechnicalCommittee | null>
  findByDocument(document: string): Promise<TechnicalCommittee | null>

  findByCategoryIdTeamId(
    categoryId: string,
    teamId: string,
  ): Promise<TechnicalCommitteeProps[]>
}
