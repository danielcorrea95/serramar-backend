import { InMemoryTeamsRepository } from '@/repositories/InMemory/InMemoryTeamsRepository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateTeamUseCase } from './CreateTeamUseCase'

let teamsRepository: InMemoryTeamsRepository
let sut: CreateTeamUseCase

describe('Create Team Use Case', () => {
  beforeEach(() => {
    teamsRepository = new InMemoryTeamsRepository()
    sut = new CreateTeamUseCase(teamsRepository)
  })

  it('should be able create team', async () => {
    const { team } = await sut.execute({
      name: 'team example',
      responsible: 'John doe',
      email: 'email@example.com',
      phone: '00 00000-0000',
      fundationDate: new Date('2023-03-16'),
      cityId: 1,
    })

    expect(team.id).toEqual(expect.any(String))
  })
})
