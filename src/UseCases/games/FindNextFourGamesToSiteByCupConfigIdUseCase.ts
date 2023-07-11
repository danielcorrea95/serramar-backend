import { GamesRepository } from '@/repositories/GamesRepository'

export class FindNextFourGamesToSiteByCupConfigIdUseCase {
  constructor(private gamesRepository: GamesRepository) {}
  async execute(cupConfigId: string) {
    const games = await this.gamesRepository.nextFourGamesByCupConfigId(
      cupConfigId,
    )

    return games
  }
}
