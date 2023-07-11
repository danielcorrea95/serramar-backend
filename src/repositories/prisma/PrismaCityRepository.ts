import { City } from '@prisma/client'
import { CitiesRepository } from '../CitiesRepository'
import { prisma } from '@/lib/prisma'

export class PrismaCityRepository implements CitiesRepository {
  async findByStateId(stateId: number): Promise<City[]> {
    const cities = await prisma.city.findMany({
      where: {
        state_id: stateId,
      },
    })
    return cities
  }
}
