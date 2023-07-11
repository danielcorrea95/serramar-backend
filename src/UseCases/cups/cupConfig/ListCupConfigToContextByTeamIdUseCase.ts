import { CupConfigRepository } from '@/repositories/CupConfigRepository'

export class ListCupConfigToContextByTeamIdUseCase {
  constructor(private cupConfigRepository: CupConfigRepository) {}

  async execute(teamId: string) {
    const cupsConfig = await this.cupConfigRepository.findCupConfigByTeamId(
      teamId,
    )

    return cupsConfig
  }
}
