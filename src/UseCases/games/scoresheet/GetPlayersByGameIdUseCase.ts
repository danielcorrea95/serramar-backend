import { GamesRepository } from '@/repositories/GamesRepository'
import { TeamsRepository } from '@/repositories/TeamsRepository'
import { PlayersRepository } from '@/repositories/PlayersRepository'
import { TechnicalCommitteeRepository } from '@/repositories/TechnicalCommitteeRepository'
import { GameNotFoundError } from '../../errors/GameNotFoundError'
import { TeamANotFoundError } from '../../errors/TeamANotFoundError'
import { TeamBNotFoundError } from '../../errors/TeamBNotFoundError'

interface TechnicalCommitteeProps {
  id: string
  name: string
  document: string
  attachment: string
  technicalCommitteeType: string
}

interface PlayersProps {
  id: string
  name: string
  document: string
}

interface ResponseGameData {
  teamA: {
    id: string
    name: string
    technicalCommittee: TechnicalCommitteeProps[]
    players: PlayersProps[]
  }
  teamB: {
    id: string
    name: string
    technicalCommittee: TechnicalCommitteeProps[]
    players: PlayersProps[]
  }
}

export class GetPlayersByGameIdUseCase {
  constructor(
    private gamesRepository: GamesRepository,
    private teamsTeamRepository: TeamsRepository,
    private technicalCommitteeRepository: TechnicalCommitteeRepository,
    private playersRepository: PlayersRepository,
  ) {}

  async execute(gameId: string): Promise<ResponseGameData> {
    console.log(gameId)
    const categoryTeams = await this.gamesRepository.findById(gameId)

    if (!categoryTeams) {
      throw new GameNotFoundError()
    }

    const filterTeamA = {
      categoryId: categoryTeams.category_id,
      teamA: categoryTeams.team_a,
    }

    const teamAData = await this.teamsTeamRepository.findById(filterTeamA.teamA)

    if (!teamAData) {
      throw new TeamANotFoundError()
    }

    const technicalCommitteeTeamA =
      await this.technicalCommitteeRepository.findByCategoryIdTeamId(
        filterTeamA.categoryId,
        filterTeamA.teamA,
      )

    const playersTeamA =
      await this.playersRepository.findPlayersByCategoryIdAndTeamId(
        filterTeamA.categoryId,
        filterTeamA.teamA,
      )

    const filterTeamB = {
      categoryId: categoryTeams.category_id,
      teamB: categoryTeams.team_b,
    }

    const teamBData = await this.teamsTeamRepository.findById(filterTeamB.teamB)

    if (!teamBData) {
      throw new TeamBNotFoundError()
    }

    const technicalCommitteeTeamB =
      await this.technicalCommitteeRepository.findByCategoryIdTeamId(
        filterTeamB.categoryId,
        filterTeamB.teamB,
      )

    const playersTeamB =
      await this.playersRepository.findPlayersByCategoryIdAndTeamId(
        filterTeamB.categoryId,
        filterTeamB.teamB,
      )

    const returnProps: ResponseGameData = {
      teamA: {
        id: teamAData.id,
        name: teamAData.name,
        technicalCommittee: technicalCommitteeTeamA,
        players: playersTeamA,
      },
      teamB: {
        id: teamBData.id,
        name: teamBData.name,
        technicalCommittee: technicalCommitteeTeamB,
        players: playersTeamB,
      },
    }

    return returnProps
  }
}
