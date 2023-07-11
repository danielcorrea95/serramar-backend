import { CitiesRepository } from '@/repositories/CitiesRepository'

interface CityByStateIdRequest {
  stateId: number
}

interface CityByStateIdResponse {
  id: number
  name: string
}

export class GetCityByStateIdUseCase {
  constructor(private citiesRepository: CitiesRepository) {}

  async execute({
    stateId,
  }: CityByStateIdRequest): Promise<CityByStateIdResponse[]> {
    const cityByStateId = await this.citiesRepository.findByStateId(stateId)

    return cityByStateId.map((city) => ({
      id: city.id,
      name: city.name,
    }))
  }
}
