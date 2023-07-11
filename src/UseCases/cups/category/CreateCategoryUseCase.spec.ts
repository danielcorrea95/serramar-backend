import { InMemoryCategoriesRepository } from '@/repositories/InMemory/InMemoryCategoriesRepository'
import { InMemoryGroupsRepository } from '@/repositories/InMemory/InMemoryGroupsRepository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'

let categoryRepository: InMemoryCategoriesRepository
let groupRepository: InMemoryGroupsRepository
let sut: CreateCategoryUseCase

describe('Create Category Use Case', () => {
  beforeEach(() => {
    categoryRepository = new InMemoryCategoriesRepository()
    groupRepository = new InMemoryGroupsRepository()
    sut = new CreateCategoryUseCase(categoryRepository, groupRepository)
  })

  it('should be able create category', async () => {
    const { category } = await sut.execute({
      cupConfigId: 'cup-1',
      name: 'test',
      amountGroup: 1,
      amountNextPhase: 1,
      amountTeams: 1,
    })

    expect(category.id).toEqual(expect.any(String))
  })
})
