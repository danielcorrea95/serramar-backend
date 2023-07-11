import { PlayersRepository } from '@/repositories/PlayersRepository'
import { Player } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError'

interface UpdatePlayerRequest {
  id: string
  name: string
  nickname?: string
  dateBirth?: Date
  document: string
  phone?: string
}

export class UpdatePlayerUseCase {
  constructor(private playersRepository: PlayersRepository) {}
  async execute({
    id,
    name,
    nickname,
    dateBirth,
    document,
    phone,
  }: UpdatePlayerRequest): Promise<Player> {
    const player = this.playersRepository.findByid(id)

    if (!player) {
      throw new ResourceNotFoundError()
    }

    const doc = document.replace(/[^0-9]/g, '')
    const phoneNumber = phone?.replace(/[^0-9]/g, '')

    const update = await this.playersRepository.update({
      id,
      name,
      nickname,
      date_birth: dateBirth,
      document: doc,
      phone: phoneNumber,
    })

    return update
  }
}
