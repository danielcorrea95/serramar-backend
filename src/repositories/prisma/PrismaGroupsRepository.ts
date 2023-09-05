import { prisma } from '@/lib/prisma'
import { Group, Prisma } from '@prisma/client'
import { GroupsRepository } from '../GroupsRepository'

export class PrismaGroupsRepository implements GroupsRepository {
  async create(data: Prisma.GroupUncheckedCreateInput) {
    const group = await prisma.group.create({
      data,
    })

    return group
  }

  async findByCategoryId(categoryId: string): Promise<Group[]> {
    const groups = await prisma.group.findMany({
      where: {
        category_id: categoryId,
      },
    })

    return groups
  }
}
