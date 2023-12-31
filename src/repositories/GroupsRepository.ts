import { Group, Prisma } from '@prisma/client'

export interface GroupsRepository {
  create(data: Prisma.GroupUncheckedCreateInput): Promise<Group>
  findByCategoryId(categoryId: string): Promise<Group[]>
}
