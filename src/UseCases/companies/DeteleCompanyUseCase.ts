import { CompaniesRepository } from '@/repositories/CompaniesRepository'
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError'

export class DeleteCompanyUseCase {
  constructor(private companiesRepository: CompaniesRepository) {}
  async execute(companyId: string) {
    const company = await this.companiesRepository.findById(companyId)

    if (!company) {
      throw new ResourceNotFoundError()
    }

    await this.companiesRepository.delete(companyId)
  }
}
