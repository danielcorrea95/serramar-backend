import { CompaniesRepository } from '@/repositories/CompaniesRepository'

export class GetAllCompanyUseCase {
  constructor(private companiesRepository: CompaniesRepository) {}

  async execute(page: number) {
    const limitQueryPage = 10

    const companies = await this.companiesRepository.findAll(
      limitQueryPage,
      page,
    )

    return companies
  }
}
