import { CompaniesRepository } from '@/repositories/CompaniesRepository'
import { Company } from '@prisma/client'
import { CnpjAlreadyExistsError } from '../errors/CnpjAlreadyExistsError'
import { UsersRepository } from '@/repositories/UsersRepository'
import { CompanyUserRepository } from '@/repositories/CompanyUserRepository'
import { EmailAlreadyExistsError } from '../errors/EmailAlreadyExistsError'

interface CreateCompanyUseCaseRequest {
  name: string
  cnpj: string
  phone: string
  email: string
  address: string
  cityId: number
  stateId: number
}

interface CreateCompanyUseCaseResponse {
  company: Company
}

export class CreateCompanyUseCase {
  constructor(
    private companiesRepository: CompaniesRepository,
    private usersRepository: UsersRepository,
    private companyUserRepository: CompanyUserRepository,
  ) {}

  async execute({
    name,
    cnpj,
    phone,
    email,
    address,
    cityId,
    stateId,
  }: CreateCompanyUseCaseRequest): Promise<CreateCompanyUseCaseResponse> {
    if (cnpj) {
      const companyWithSameCnpj = await this.companiesRepository.findByCnpj(
        cnpj,
      )
      if (companyWithSameCnpj) {
        throw new CnpjAlreadyExistsError()
      }
    }

    const emailAlreadyExists = await this.companiesRepository.findByEmail(email)

    if (emailAlreadyExists) {
      throw new EmailAlreadyExistsError()
    }

    const company = await this.companiesRepository.create({
      name,
      cnpj,
      phone,
      email,
      address,
      city_id: cityId,
      state_id: stateId,
    })

    const usersOfRoleAdmin = await this.usersRepository.findByRoleName('admin')

    usersOfRoleAdmin.map(async (item) => {
      await this.companyUserRepository.create(company.id, item.id)
    })

    return { company }
  }
}
