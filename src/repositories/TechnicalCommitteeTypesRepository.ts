import { TechnicalCommitteeTypes } from '@prisma/client'

export interface TechnicalCommitteeTypesRepository {
  listAll(): Promise<TechnicalCommitteeTypes[]>
}
