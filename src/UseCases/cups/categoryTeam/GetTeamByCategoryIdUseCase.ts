import { TeamsRepository } from '@/repositories/TeamsRepository'

export class GetTeamByCategoryIdUseCase {
  constructor(private teamsRepository: TeamsRepository) {}

  async execute(catagoryId: string) {
    const teams = await this.teamsRepository.findByCategoryId(catagoryId)

    return teams
  }
}
