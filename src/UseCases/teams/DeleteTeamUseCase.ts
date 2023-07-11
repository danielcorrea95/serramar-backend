import { TeamsRepository } from '@/repositories/TeamsRepository'
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError'

export class DeleteTeamUseCase {
  constructor(private teamsRepository: TeamsRepository) {}

  async execute(id: string) {
    const team = await this.teamsRepository.findById(id)

    if (!team) {
      throw new ResourceNotFoundError()
    }

    await this.teamsRepository.delete(id)
  }
}
