import { PlayersRepository } from '@/repositories/PlayersRepository'

export class GetAllPlayerUseCase {
  constructor(private playersRepository: PlayersRepository) {}
  async execute(page: number) {
    const limitQueryPage = 10

    const players = await this.playersRepository.findAll(page, limitQueryPage)

    return players
  }
}
