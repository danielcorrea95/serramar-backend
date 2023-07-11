import { GamesRepository } from '@/repositories/GamesRepository'

export class FindGamesByCupConfigIdUseCase {
  constructor(private gamesRepository: GamesRepository) {}
  async execute(cupConfigId: string) {
    const games = await this.gamesRepository.findByCupConfigId(cupConfigId)

    return games
  }
}
