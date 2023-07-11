import { prisma } from '@/lib/prisma'
import { TeamUserRepository } from '../TeamUserRepository'

export class PrismaTeamUserRepository implements TeamUserRepository {
  async create(userId: string, teamId: string): Promise<void> {
    await prisma.userTeam.create({
      data: {
        user_id: userId,
        team_id: teamId,
      },
    })
  }

  async delete(userId: string, teamId: string): Promise<void> {
    await prisma.userTeam.updateMany({
      where: {
        team_id: teamId,
        user_id: userId,
      },
      data: {
        deleted: true,
      },
    })
  }
}
