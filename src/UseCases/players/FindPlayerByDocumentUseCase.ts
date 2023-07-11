import { PlayersRepository } from '@/repositories/PlayersRepository'

interface FindPlayerByDocumentUseCaseRequest {
  document: string
}

export class FindPlayerByDocumentUseCase {
  constructor(private playersRepository: PlayersRepository) {}
  async execute({ document }: FindPlayerByDocumentUseCaseRequest) {
    const doc = document.replace(/[^0-9]/g, '')

    const player = await this.playersRepository.findByDocument(doc)

    return player
  }
}
