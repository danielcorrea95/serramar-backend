import { InMemoryPlayersRepository } from '@/repositories/InMemory/InMemoryPlayersRepository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError'
import { FindPlayerByDocumentUseCase } from './FindPlayerByDocumentUseCase'

let playersRepository: InMemoryPlayersRepository
let sut: FindPlayerByDocumentUseCase

describe('Find player by document use case', () => {
  beforeEach(() => {
    playersRepository = new InMemoryPlayersRepository()
    sut = new FindPlayerByDocumentUseCase(playersRepository)
  })
  it('should able to find a player by document', async () => {
    await playersRepository.create({
      name: 'John Doe',
      nickname: 'John',
      date_birth: '2023-03-21',
      document: '123456789',
      phone: '00 00000-0000',
    })

    const { player } = await sut.execute({
      document: '123456789',
    })

    expect(player.name).toEqual('John Doe')
  })

  it('should not be able to get player with wrong id', async () => {
    await expect(() =>
      sut.execute({
        document: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
