import { ResourceNotFoundError } from '@/UseCases/errors/ResourceNotFoundError'
import { GamesRepository } from '@/repositories/GamesRepository'

export class FindGameByIdAllDataUseCase {
  constructor(private gamesRepository: GamesRepository) {}
  async execute(gameId: string) {
    const game = await this.gamesRepository.findGameByIdAllData(gameId)

    if (!game) {
      throw new ResourceNotFoundError()
    }

    return game
  }
}
