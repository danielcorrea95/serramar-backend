import { PrismaCityRepository } from '@/repositories/prisma/PrismaCityRepository'
import { GetCityByStateIdUseCase } from '../statesAndCities/GetCityByStateIdUseCase'

export function MakeGetCityByStateIdUseCase() {
  const prismaCityRepository = new PrismaCityRepository()
  const getCityByStateIdUseCase = new GetCityByStateIdUseCase(
    prismaCityRepository,
  )

  return getCityByStateIdUseCase
}
