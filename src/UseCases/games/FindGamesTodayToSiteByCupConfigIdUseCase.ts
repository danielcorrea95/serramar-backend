import { GamesRepository } from '@/repositories/GamesRepository'

export class FindGamesTodayToSiteByCupConfigIdUseCase {
  constructor(private gamesRepository: GamesRepository) {}
  async execute(cupConfigId: string) {
    const gamesToday = await this.gamesRepository.gamesTodayByCupConfigId(
      cupConfigId,
    )

    return gamesToday
  }
}
