import { CompaniesRepository } from '@/repositories/CompaniesRepository'
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError'

interface UpdateCompanyUseCaseRequest {
  id: string
  name: string
  cnpj: string
  phone: string
  email: string
  address: string
  cityId: number
  stateId: number
}

export class UpdateCompanyUseCase {
  constructor(private companiesRepository: CompaniesRepository) {}
  async execute({
    id,
    name,
    cnpj,
    phone,
    email,
    address,
    stateId,
    cityId,
  }: UpdateCompanyUseCaseRequest) {
    const company = await this.companiesRepository.findById(id)

    if (!company) {
      throw new ResourceNotFoundError()
    }

    const updateCompany = this.companiesRepository.update({
      id,
      name,
      cnpj,
      phone,
      email,
      address,
      state_id: stateId,
      city_id: cityId,
    })

    return updateCompany
  }
}
