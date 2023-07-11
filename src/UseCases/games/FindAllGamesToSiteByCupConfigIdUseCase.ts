import { GamesRepository } from '@/repositories/GamesRepository'

export class FindAllGamesToSiteByCupConfigIdUseCase {
  constructor(private gamesRepository: GamesRepository) {}

  async execute(cupConfigId: string) {
    const allgames = await this.gamesRepository.allgamesByCupConfigId(
      cupConfigId,
    )

    return allgames
  }
}
