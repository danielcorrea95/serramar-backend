import { PlayersRepository } from '@/repositories/PlayersRepository'
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError'

export class DeletePlayerUseCase {
  constructor(private playersRepository: PlayersRepository) {}

  async execute(id: string) {
    const player = await this.playersRepository.findByid(id)

    console.log(player)

    if (!player) {
      throw new ResourceNotFoundError()
    }

    await this.playersRepository.delete(id)
  }
}
