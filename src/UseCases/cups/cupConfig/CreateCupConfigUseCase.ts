import { CupConfigRepository } from '@/repositories/CupConfigRepository'
import { CupConfig } from '@prisma/client'

interface CreateCupConfigUseCaseRequest {
  cupId: string
  name: string
  registrationDeadline: Date
  newStartDate: Date
  newEndDate: Date
  amountPlayers: number
  regulation: string
}

interface CreateCupConfigUseCaseResponse {
  cupConfig: CupConfig
}

export class CreateCupConfigUseCase {
  constructor(private cupConfigRepository: CupConfigRepository) {}
  async execute({
    cupId,
    name,
    registrationDeadline,
    newStartDate,
    newEndDate,
    amountPlayers,
    regulation,
  }: CreateCupConfigUseCaseRequest): Promise<CreateCupConfigUseCaseResponse> {
    const cupConfig = await this.cupConfigRepository.create({
      cup_id: cupId,
      registration_deadline: registrationDeadline,
      name,
      start_date: newStartDate,
      end_date: newEndDate,
      amount_players: amountPlayers,
      regulation,
    })

    return { cupConfig }
  }
}
