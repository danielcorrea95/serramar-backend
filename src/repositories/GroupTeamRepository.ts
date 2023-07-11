import { GroupTeam, Prisma } from '@prisma/client'

export interface GroupTeamRepository {
  create(data: Prisma.GroupTeamUncheckedCreateInput): Promise<GroupTeam>
  findByGroupIdAndTeamId(
    groupId: string,
    teamId: string,
  ): Promise<GroupTeam | null>
}
