import { GroupTeamRepository } from '@/repositories/GroupTeamRepository'
import { GroupTeam } from '@prisma/client'
import { TeamAlreadyExistsInTheGroupError } from '../../errors/TeamAlreadyExistsInTheGroupError'

interface LinkGroupTeamUseCaseRequest {
  groupId: string
  teamId: string
}

interface LinkGroupTeamUseCaseResponse {
  groupTeam: GroupTeam
}

export class LinkGroupTeamUseCase {
  constructor(private groupTeamRepository: GroupTeamRepository) {}

  async execute({
    groupId,
    teamId,
  }: LinkGroupTeamUseCaseRequest): Promise<LinkGroupTeamUseCaseResponse> {
    const groupTeamAlreadyExists =
      await this.groupTeamRepository.findByGroupIdAndTeamId(groupId, teamId)

    if (groupTeamAlreadyExists) {
      throw new TeamAlreadyExistsInTheGroupError()
    }

    const groupTeam = await this.groupTeamRepository.create({
      group_id: groupId,
      team_id: teamId,
    })

    return { groupTeam }
  }
}
