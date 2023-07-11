import { City } from '@prisma/client'

export interface CitiesRepository {
  findByStateId(stateId: number): Promise<City[]>
}
