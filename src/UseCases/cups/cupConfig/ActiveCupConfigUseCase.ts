import { CupConfigRepository } from '@/repositories/CupConfigRepository'
import { CupConfig } from '@prisma/client'
import { CupConfigAlreadyActiveError } from '../../errors/CupConfigAlreadyActiveError'

interface ActiveCupUseCaseRequest {
  cupId: string
  cupConfigId: string
  active: boolean
}

interface ActiveCupUseCaseResponse {
  cupConfig: CupConfig
  inactiveCupConfig: CupConfig | null
}

export class ActiveCupUseCase {
  constructor(private cupConfigRepository: CupConfigRepository) {}
  async execute({
    cupId,
    cupConfigId,
    active,
  }: ActiveCupUseCaseRequest): Promise<ActiveCupUseCaseResponse> {
    let inactiveCupConfig = null
    const cupConfigActive = await this.cupConfigRepository.findCupByBetweenDate(
      cupId,
    )

    if (cupConfigActive) {
      throw new CupConfigAlreadyActiveError()
    }

    const cupConfigOutOfDate =
      await this.cupConfigRepository.findCupActiveButOutOfPeriod(cupId)

    if (cupConfigOutOfDate) {
      inactiveCupConfig = await this.cupConfigRepository.activeCup(
        cupConfigOutOfDate.id,
        false,
      )
    }

    const cupConfig = await this.cupConfigRepository.activeCup(
      cupConfigId,
      active,
    )

    return { cupConfig, inactiveCupConfig }
  }
}
