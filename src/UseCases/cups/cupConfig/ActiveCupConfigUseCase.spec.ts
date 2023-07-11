import { InMemoryCupConfigRepository } from '@/repositories/InMemory/InMemoryCupConfigRepository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ActiveCupUseCase } from './ActiveCupConfigUseCase'
import { CupConfigAlreadyActiveError } from '@/UseCases/errors/CupConfigAlreadyActiveError'

let cupConfigRepository: InMemoryCupConfigRepository
let sut: ActiveCupUseCase

describe('Active Cup Use Case', () => {
  beforeEach(() => {
    cupConfigRepository = new InMemoryCupConfigRepository()
    sut = new ActiveCupUseCase(cupConfigRepository)
  })
  it('should be able active a cup', async () => {
    await cupConfigRepository.create({
      cup_id: 'test-cup-1',
      amount_players: 20,
      regulation: 'test',
      start_date: '2023-03-01',
      end_date: '2023-03-30',
    })

    const { cupConfig } = await sut.execute({
      cupId: 'test-cup-1',
      cupConfigId: 'cup-config-id-1',
      active: true,
    })
    expect(cupConfig.active).toEqual(true)
  })

  it('should not be able active a cup with another cup with date active', async () => {
    await cupConfigRepository.create({
      id: 'test-1',
      cup_id: 'test-cup-1',
      amount_players: 20,
      regulation: 'test',
      start_date: '2023-03-01',
      end_date: '2023-06-30',
      active: true,
    })

    await cupConfigRepository.create({
      id: 'test-2',
      cup_id: 'test-cup-1',
      amount_players: 20,
      regulation: 'test',
      start_date: '2023-03-01',
      end_date: '2023-06-30',
      active: false,
    })

    await expect(() =>
      sut.execute({
        cupId: 'test-cup-1',
        cupConfigId: 'test-2',
        active: true,
      }),
    ).rejects.toBeInstanceOf(CupConfigAlreadyActiveError)
  })

  it('should be able active a new cup and inactivate another cup how end bigger date at date now', async () => {
    await cupConfigRepository.create({
      id: 'test-1',
      cup_id: 'test-cup-1',
      amount_players: 20,
      regulation: 'test',
      start_date: '2023-05-01',
      end_date: '2023-08-30',
      active: true,
    })

    await cupConfigRepository.create({
      id: 'test-2',
      cup_id: 'test-cup-1',
      amount_players: 20,
      regulation: 'test',
      start_date: '2023-03-01',
      end_date: '2023-06-30',
      active: false,
    })

    const { inactiveCupConfig } = await sut.execute({
      cupId: 'test-cup-1',
      cupConfigId: 'test-2',
      active: true,
    })
    expect(inactiveCupConfig?.active).toEqual(false)
  })

  it('should be able active a new cup and inactivate another cup how end minor date at date now', async () => {
    await cupConfigRepository.create({
      id: 'test-1',
      cup_id: 'test-cup-1',
      amount_players: 20,
      regulation: 'test',
      start_date: '2022-05-01',
      end_date: '2022-06-30',
      active: true,
    })

    await cupConfigRepository.create({
      id: 'test-2',
      cup_id: 'test-cup-1',
      amount_players: 20,
      regulation: 'test',
      start_date: '2023-03-01',
      end_date: '2023-06-30',
      active: false,
    })

    const { inactiveCupConfig } = await sut.execute({
      cupId: 'test-cup-1',
      cupConfigId: 'test-2',
      active: true,
    })
    expect(inactiveCupConfig?.active).toEqual(false)
  })
})
