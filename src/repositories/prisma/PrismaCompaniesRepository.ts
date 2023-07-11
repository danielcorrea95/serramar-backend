import { prisma } from '@/lib/prisma'
import { Prisma, Company } from '@prisma/client'
import { CompaniesRepository } from '../CompaniesRepository'

export class PrismaCompaniesRepository implements CompaniesRepository {
  async create(data: Prisma.CompanyUncheckedCreateInput): Promise<Company> {
    const company = await prisma.company.create({
      data,
    })

    return company
  }

  async findAll(limitQueryPage: number, page: number): Promise<Company[]> {
    const skipSearch = (page - 1) * limitQueryPage

    const companies = await prisma.company.findMany({
      where: {
        deleted: false,
      },
      skip: skipSearch,
      take: limitQueryPage,
    })

    return companies
  }

  async findByCnpj(cnpj: string): Promise<Company | null> {
    const company = await prisma.company.findFirst({
      where: {
        cnpj,
        deleted: false,
      },
    })
    return company
  }

  async findByEmail(email: string): Promise<Company | null> {
    const company = await prisma.company.findFirst({
      where: {
        email,
      },
    })

    return company
  }

  async findById(id: string): Promise<Company | null> {
    const company = await prisma.company.findFirst({
      where: {
        id,
        deleted: false,
      },
    })

    return company
  }

  async update(data: Prisma.CompanyUncheckedCreateInput): Promise<Company> {
    const update = await prisma.company.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        cnpj: data.cnpj,
        phone: data.phone,
        email: data.email,
        address: data.address,
        state_id: data.state_id,
        city_id: data.city_id,
      },
    })

    return update
  }

  async delete(id: string): Promise<void> {
    await prisma.company.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    })
  }
}
