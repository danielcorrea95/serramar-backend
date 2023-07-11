import { PlayersRepository } from '@/repositories/PlayersRepository'
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError'

export class GetPlayerByIdUseCase {
  constructor(private playersRepository: PlayersRepository) {}
  async execute(id: string) {
    const player = await this.playersRepository.findByid(id)

    if (!player) {
      throw new ResourceNotFoundError()
    }

    return player
  }
}
