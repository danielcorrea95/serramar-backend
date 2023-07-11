import { PlayersRepository } from '@/repositories/PlayersRepository'
import { Player } from '@prisma/client'

interface CreatePlayerUseCaseRequest {
  name: string
  nickname?: string
  dateBirth?: Date
  document: string
  phone?: string
}

interface CreatePlayerUseCaseResponse {
  player: Player
}

export class CreatePlayerUseCase {
  constructor(private playersRepository: PlayersRepository) {}
  async execute({
    name,
    nickname,
    dateBirth,
    document,
    phone,
  }: CreatePlayerUseCaseRequest): Promise<CreatePlayerUseCaseResponse> {
    const doc = document.replace(/[^0-9]/g, '')
    const phoneNumber = phone?.replace(/[^0-9]/g, '')

    const playerAlreadyExists = await this.playersRepository.findByDocument(doc)

    if (playerAlreadyExists) {
      const player = playerAlreadyExists
      return { player }
    }

    const player = await this.playersRepository.create({
      name,
      nickname,
      date_birth: dateBirth,
      document: doc,
      phone: phoneNumber,
    })

    return { player }
  }
}
