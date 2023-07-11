import { Prisma, Company } from '@prisma/client'
import { CompaniesRepository } from '../CompaniesRepository'

export class InMemoryCompaniesRepository implements CompaniesRepository {
  public items: Company[] = []

  async create(data: Prisma.CompanyUncheckedCreateInput) {
    const company = {
      id: 'company-1',
      name: data.name,
      cnpj: data.cnpj ? data.cnpj : null,
      phone: data.phone ? data.phone : null,
      email: data.email,
      address: data.address ? data.address : null,
      city_id: data.city_id,
      state_id: data.state_id,
      deleted: false,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(company)

    return company
  }

  async findByCnpj(cnpj: string) {
    const company = this.items.find((item) => item.cnpj === cnpj)

    if (!company) {
      return null
    }

    return company
  }

  async findById(id: string) {
    const company = this.items.find((item) => item.id === id)

    if (!company) {
      return null
    }

    return company
  }
}
