import { GameDetailsRepository } from '@/repositories/GameDetailsRepository'

interface GameProps {
  gameId: string
  userId: string
}

export class CreateGameDetailsUseCase {
  constructor(private gameDetailRepository: GameDetailsRepository) {}
  async execute({ gameId, userId }: GameProps) {
    const findByGameId = await this.gameDetailRepository.findByGameId(gameId)

    if (findByGameId) {
      return findByGameId
    }

    const gameDetail = await this.gameDetailRepository.create(gameId, userId)

    return gameDetail
  }
}
