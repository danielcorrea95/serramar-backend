import { TeamsRepository } from '@/repositories/TeamsRepository'
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError'

export class GetTeamByIdUseCase {
  constructor(private teamsRepository: TeamsRepository) {}

  async execute(id: string) {
    const team = await this.teamsRepository.findById(id)

    if (!team) {
      throw new ResourceNotFoundError()
    }

    return team
  }
}
