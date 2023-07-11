import { InMemoryCompaniesRepository } from '@/repositories/InMemory/InMemoryCompaniesRepository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateCompanyUseCase } from './CreateCompanyUseCase'
import { CnpjAlreadyExistsError } from '../errors/CnpjAlreadyExistsError'

let companyRepository: InMemoryCompaniesRepository
let sut: CreateCompanyUseCase

describe('Create Company Use Case', () => {
  beforeEach(() => {
    companyRepository = new InMemoryCompaniesRepository()
    sut = new CreateCompanyUseCase(companyRepository)
  })

  it('should be able create company', async () => {
    const { company } = await sut.execute({
      name: 'company-test',
      cnpj: '000.000.000/0000-00',
      email: 'company@example.com',
      phone: '00 00000-0000',
      address: 'test',
      cityId: 1,
      stateId: 1,
    })

    expect(company.id).toEqual(expect.any(String))
  })

  it('should not be able to register with same cnpj twice', async () => {
    await sut.execute({
      name: 'company-test',
      cnpj: '000.000.000/0000-00',
      email: 'company@example.com',
      phone: '00 00000-0000',
      address: 'test',
      cityId: 1,
      stateId: 1,
    })

    await expect(() =>
      sut.execute({
        name: 'company-test',
        cnpj: '000.000.000/0000-00',
        email: 'company@example.com',
        phone: '00 00000-0000',
        address: 'test',
        cityId: 1,
        stateId: 1,
      }),
    ).rejects.toBeInstanceOf(CnpjAlreadyExistsError)
  })
})
