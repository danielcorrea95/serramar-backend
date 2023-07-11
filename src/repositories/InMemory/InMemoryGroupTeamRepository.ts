import { GroupTeam, Prisma } from '@prisma/client'
import { GroupTeamRepository } from '../GroupTeamRepository'

export class InMemoryGroupTeamRepository implements GroupTeamRepository {
  public items: GroupTeam[] = []
  async create(data: Prisma.GroupTeamUncheckedCreateInput) {
    const groupTeam = {
      id: data.id ? data.id : 'group-team-1',
      group_id: data.group_id,
      team_id: data.team_id,
      deleted: false,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(groupTeam)

    return groupTeam
  }

  async findByGroupIdAndTeamId(groupId: string, teamId: string) {
    const groupTeam = this.items.find(
      (item) => item.group_id === groupId && item.team_id === teamId,
    )

    if (!groupTeam) {
      return null
    }

    return groupTeam
  }
}
