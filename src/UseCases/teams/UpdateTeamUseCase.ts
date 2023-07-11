import { TeamsRepository } from '@/repositories/TeamsRepository'
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError'

interface UpdateTeamUseCaseRequest {
  id: string
  name: string
  responsible: string
  phone?: string
  email?: string
  fundationDate: Date
  cityId: number
}

export class UpdateTeamUseCase {
  constructor(private teamRepository: TeamsRepository) {}

  async execute({
    id,
    name,
    responsible,
    phone,
    email,
    fundationDate,
    cityId,
  }: UpdateTeamUseCaseRequest) {
    const phoneNumber = phone?.replace(/[^0-9]/g, '')

    const team = await this.teamRepository.findById(id)

    if (!team) {
      throw new ResourceNotFoundError()
    }

    const updateTeam = await this.teamRepository.update({
      id,
      name,
      responsible,
      phone: phoneNumber,
      email,
      foundation_date: fundationDate,
      city_id: cityId,
    })

    return updateTeam
  }
}
