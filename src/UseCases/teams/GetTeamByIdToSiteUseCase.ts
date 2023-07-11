import { TeamsRepository } from '@/repositories/TeamsRepository'

export class GetTeamByIdToSiteUseCase {
  constructor(private teamRepository: TeamsRepository) {}
  async execute(teamId: string) {
    const team = await this.teamRepository.findTeamByIdToSite(teamId)

    return team
  }
}
