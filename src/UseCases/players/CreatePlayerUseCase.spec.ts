import { InMemoryPlayersRepository } from '@/repositories/InMemory/InMemoryPlayersRepository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePlayerUseCase } from './CreatePlayerUseCase'
import { PlayerAlreadyExistsError } from '../errors/PlayerAlreadyExistsError'

let playersRepository: InMemoryPlayersRepository
let sut: CreatePlayerUseCase

describe('Create Player Use Case', () => {
  beforeEach(() => {
    playersRepository = new InMemoryPlayersRepository()
    sut = new CreatePlayerUseCase(playersRepository)
  })

  it('should be able create player', async () => {
    const { player } = await sut.execute({
      name: 'John Doe',
      nickname: 'John Doe',
      dateBirth: new Date('1990-01-01'),
      document: '1234567890',
      phone: '1234567890',
    })

    expect(player.id).toEqual(expect.any(String))
  })

  it('should not be able to create with same document twice', async () => {
    await sut.execute({
      name: 'John Doe',
      nickname: 'John Doe',
      dateBirth: new Date('1990-01-01'),
      document: '1234567890',
      phone: '1234567890',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        nickname: 'John Doe',
        dateBirth: new Date('1990-01-01'),
        document: '1234567890',
        phone: '1234567890',
      }),
    ).rejects.toBeInstanceOf(PlayerAlreadyExistsError)
  })
})
