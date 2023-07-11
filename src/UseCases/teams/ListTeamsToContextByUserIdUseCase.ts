import { TeamsRepository } from '@/repositories/TeamsRepository'

export class ListTeamsToContextByUserIdUseCase {
  constructor(private teamsRepository: TeamsRepository) {}
  async execute(userId: string) {
    const teams = await this.teamsRepository.findTeamsByUserId(userId)

    return teams
  }
}
