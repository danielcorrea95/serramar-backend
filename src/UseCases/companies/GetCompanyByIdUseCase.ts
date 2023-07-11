import { CompaniesRepository } from '@/repositories/CompaniesRepository'
import { Company } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError'

export class GetCompanyByIdUseCase {
  constructor(private companiesRepository: CompaniesRepository) {}
  async execute(companyId: string): Promise<Company> {
    const company = await this.companiesRepository.findById(companyId)

    if (!company) {
      throw new ResourceNotFoundError()
    }

    return company
  }
}
