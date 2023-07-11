import { GamesRepository } from '@/repositories/GamesRepository'

export class FindOldFourGamesToSiteByCupConfigIdUseCase {
  constructor(private gamesRepository: GamesRepository) {}
  async execute(cupConfigId: string) {
    const oldFourGames = await this.gamesRepository.oldFourGamesByCupConfigId(
      cupConfigId,
    )

    return oldFourGames
  }
}
