import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { GroupsRepository } from '../GroupsRepository'

export class PrismaGroupsRepository implements GroupsRepository {
  async create(data: Prisma.GroupUncheckedCreateInput) {
    const group = await prisma.group.create({
      data,
    })

    return group
  }
}
