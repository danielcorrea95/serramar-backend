import { InMemoryCardTypesRepository } from '@/repositories/InMemory/InMemoryCardTypesRepository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateCardTypeUseCase } from './CreateCardTypeUseCase'
import { CardTypeAlreadyExistsError } from '../../errors/CardTypeAlreadyExistsError'

let cardTypesRepository: InMemoryCardTypesRepository
let sut: CreateCardTypeUseCase

describe('Create Card Type Use Case', () => {
  beforeEach(() => {
    cardTypesRepository = new InMemoryCardTypesRepository()
    sut = new CreateCardTypeUseCase(cardTypesRepository)
  })

  it('should be able create a new card type', async () => {
    const { cardType } = await sut.execute({
      cupConfigId: 'cupId-1',
      name: 'Amarelo',
      points: 100,
    })

    expect(cardType.id).toEqual(expect.any(String))
  })

  it('should not be able to create with same name card twice', async () => {
    await sut.execute({
      cupConfigId: 'cupId-1',
      name: 'Amarelo',
      points: 100,
    })

    await expect(() =>
      sut.execute({
        cupConfigId: 'cupId-1',
        name: 'Amarelo',
        points: 100,
      }),
    ).rejects.toBeInstanceOf(CardTypeAlreadyExistsError)
  })

  it('should be able to create with different names', async () => {
    await sut.execute({
      cupConfigId: 'cupId-1',
      name: 'Amarelo',
      points: 100,
    })

    const { cardType } = await sut.execute({
      cupConfigId: 'cupId-1',
      name: 'Vermelho',
      points: 100,
    })

    expect(cardType.id).toEqual(expect.any(String))
  })
})
