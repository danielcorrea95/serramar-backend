import { PlayerNumberRepository } from '@/repositories/PlayerNumberRepository'

interface PlayerProps {
  playerId: string
  number: number
}

interface PlayerNumberProps {
  gameId: string
  player: PlayerProps[]
}

export class CreatePlayerNumberByGameIdUseCase {
  constructor(private playerNumberRepository: PlayerNumberRepository) {}
  async execute(data: PlayerNumberProps) {
    data.player.forEach(async (item) => {
      const playerNumber =
        await this.playerNumberRepository.findByPlayerIdAndGameId(
          item.playerId,
          data.gameId,
        )

      if (playerNumber) {
        await this.playerNumberRepository.updateNumber(
          playerNumber.id,
          item.number,
        )
      }

      await this.playerNumberRepository.create({
        player_id: item.playerId,
        game_id: data.gameId,
        number: item.number,
      })
    })
  }
}
