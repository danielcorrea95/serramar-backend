import { ResourceNotFoundError } from '@/UseCases/errors/ResourceNotFoundError'
import { GameDetailsRepository } from '@/repositories/GameDetailsRepository'
import { GamesRepository } from '@/repositories/GamesRepository'

interface GameDetailsProps {
  id: string
  userId: string
  gameId: string
  firstPeriodStart: string
  firstPeriodEnd: string
  secondPeriodStart: string
  secondPeriodEnd: string
  extraPeriodStart: string
  extraPeriodEnd: string
  observation: string
}

export class UpdateGameDetailsByIdUseCase {
  constructor(
    private gameDetailsRepository: GameDetailsRepository,
    private gamesRepository: GamesRepository,
  ) {}

  async execute({
    id,
    userId,
    gameId,
    firstPeriodStart,
    firstPeriodEnd,
    secondPeriodStart,
    secondPeriodEnd,
    extraPeriodStart,
    extraPeriodEnd,
    observation,
  }: GameDetailsProps) {
    const gameDetails = await this.gameDetailsRepository.findByGameId(gameId)

    if (!gameDetails) {
      throw new ResourceNotFoundError()
    }

    let newFirstPeriodStart
    let newFirstPeriodEnd
    let newSecondPeriodStart
    let newSecondPeriodEnd
    let newExtraPeriodStart
    let newExtraPeriodEnd

    if (firstPeriodStart) {
      const newDate1 = new Date()
      const [hours, minutes] = firstPeriodStart.split(':')
      newDate1.setHours(Number(hours))
      newDate1.setMinutes(Number(minutes))
      newFirstPeriodStart = newDate1
    }

    if (firstPeriodEnd) {
      const newDate2 = new Date()
      const [hours, minutes] = firstPeriodEnd.split(':')
      newDate2.setHours(Number(hours))
      newDate2.setMinutes(Number(minutes))
      newFirstPeriodEnd = newDate2
    }

    if (secondPeriodStart) {
      const newDate3 = new Date()
      const [hours, minutes] = secondPeriodStart.split(':')
      newDate3.setHours(Number(hours))
      newDate3.setMinutes(Number(minutes))
      newSecondPeriodStart = newDate3
    }

    if (secondPeriodEnd) {
      const newDate4 = new Date()
      const [hours, minutes] = secondPeriodEnd.split(':')
      newDate4.setHours(Number(hours))
      newDate4.setMinutes(Number(minutes))
      newSecondPeriodEnd = newDate4
    }

    if (extraPeriodStart) {
      const newDate5 = new Date()
      const [hours, minutes] = extraPeriodStart.split(':')
      newDate5.setHours(Number(hours))
      newDate5.setMinutes(Number(minutes))
      newExtraPeriodStart = newDate5
    }

    if (extraPeriodEnd) {
      const newDate6 = new Date()
      const [hours, minutes] = extraPeriodEnd.split(':')
      newDate6.setHours(Number(hours))
      newDate6.setMinutes(Number(minutes))
      newExtraPeriodEnd = newDate6
    }

    const updateGameDetail =
      await this.gameDetailsRepository.updateGameDetailsByGameId(id, {
        game_id: gameId,
        user_id: userId,
        first_period_start: firstPeriodStart ? newFirstPeriodStart : null,
        first_period_end: firstPeriodEnd ? newFirstPeriodEnd : null,
        second_period_start: secondPeriodStart ? newSecondPeriodStart : null,
        second_period_end: secondPeriodEnd ? newSecondPeriodEnd : null,
        extra_period_start: extraPeriodStart ? newExtraPeriodStart : null,
        extra_period_end: extraPeriodEnd ? newExtraPeriodEnd : null,
        obs: observation,
        published: true,
      })

    return updateGameDetail
  }
}
