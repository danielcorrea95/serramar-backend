import { Prisma, Group } from '@prisma/client'
import { GroupsRepository } from '../GroupsRepository'

export class InMemoryGroupsRepository implements GroupsRepository {
  public items: Group[] = []
  async create(data: Prisma.GroupUncheckedCreateInput) {
    const group = {
      id: data.id ? data.id : 'group-1',
      name: data.name,
      category_id: data.category_id,
      deleted: false,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(group)

    return group
  }
}
