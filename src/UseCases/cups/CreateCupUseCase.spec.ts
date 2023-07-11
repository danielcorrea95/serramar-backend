import { InMemoryCupsRepository } from '@/repositories/InMemory/InMemoryCupsRepository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SubDomainAlreadyExistsError } from '../errors/SubDomainAlreadyExistsError'
import { CreateCupUseCase } from './CreateCupUseCase'

let cupsRepository: InMemoryCupsRepository
let sut: CreateCupUseCase

describe('Create Cup Use Case', () => {
  beforeEach(() => {
    cupsRepository = new InMemoryCupsRepository()
    sut = new CreateCupUseCase(cupsRepository)
  })

  it('should be able create cup', async () => {
    const { cup } = await sut.execute({
      companyId: 'company-id',
      name: 'cup-name',
      subDomain: 'cup-sub-domain',
    })

    expect(cup.id).toEqual(expect.any(String))
  })

  it('should not be able to register with same subdomain twice', async () => {
    await sut.execute({
      companyId: 'company-id',
      name: 'cup-name',
      subDomain: 'cup-sub-domain',
    })

    await expect(() =>
      sut.execute({
        companyId: 'company-id',
        name: 'cup-name',
        subDomain: 'cup-sub-domain',
      }),
    ).rejects.toBeInstanceOf(SubDomainAlreadyExistsError)
  })
})
