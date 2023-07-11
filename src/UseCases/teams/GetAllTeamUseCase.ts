import { TeamsRepository } from '@/repositories/TeamsRepository'

export class GetAllTeamUseCase {
  constructor(private teamsRepository: TeamsRepository) {}

  async execute(page: number) {
    const limitQueryPage = 10

    const players = await this.teamsRepository.findAll(page, limitQueryPage)

    return players
  }
}
