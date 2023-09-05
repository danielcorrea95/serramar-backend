import { GroupsRepository } from '@/repositories/GroupsRepository'

export class GetGroupsByCategoryIdUseCase {
  constructor(private groupsRepository: GroupsRepository) {}
  async execute(categoryId: string) {
    const groups = await this.groupsRepository.findByCategoryId(categoryId)

    return groups
  }
}
