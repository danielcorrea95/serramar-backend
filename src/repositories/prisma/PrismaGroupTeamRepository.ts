import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { GroupTeamRepository } from '../GroupTeamRepository'

export class PrismaGroupTeamRepository implements GroupTeamRepository {
  async create(data: Prisma.GroupTeamUncheckedCreateInput) {
    const groupTeam = await prisma.groupTeam.create({ data })

    return groupTeam
  }

  async findByGroupIdAndTeamId(groupId: string, teamId: string) {
    const groupTeam = await prisma.groupTeam.findFirst({
      where: {
        group_id: groupId,
        team_id: teamId,
        deleted: false,
      },
    })

    return groupTeam
  }
}
