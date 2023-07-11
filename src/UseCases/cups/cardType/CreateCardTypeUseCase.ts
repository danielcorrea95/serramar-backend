import { CardTypesRepository } from '@/repositories/CardTypesRepository'
import { CardType } from '@prisma/client'
import { CardTypeAlreadyExistsError } from '../../errors/CardTypeAlreadyExistsError'

interface CreateCardTypeUseCaseRequest {
  cupConfigId: string
  name: 'Amarelo' | 'Vermelho'
  points: number
}

interface CreateCardTypeUseCaseResponse {
  cardType: CardType
}

export class CreateCardTypeUseCase {
  constructor(private cardTypesRepository: CardTypesRepository) {}

  async execute({
    cupConfigId,
    name,
    points,
  }: CreateCardTypeUseCaseRequest): Promise<CreateCardTypeUseCaseResponse> {
    const cardTypeAlreadyExists =
      await this.cardTypesRepository.findByNameAndCupId(name, cupConfigId)

    if (cardTypeAlreadyExists) {
      throw new CardTypeAlreadyExistsError()
    }

    const cardType = await this.cardTypesRepository.create({
      cup_config_id: cupConfigId,
      name,
      points,
    })

    return { cardType }
  }
}
