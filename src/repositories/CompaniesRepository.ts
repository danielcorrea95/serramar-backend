import { Company, Prisma } from '@prisma/client'

export interface CompaniesRepository {
  create(data: Prisma.CompanyUncheckedCreateInput): Promise<Company>
  findAll(limitQueryPage: number, page: number): Promise<Company[]>
  findByCnpj(cnpj: string): Promise<Company | null>
  findByEmail(email: string): Promise<Company | null>
  findById(id: string): Promise<Company | null>
  update(data: Prisma.CompanyUncheckedCreateInput): Promise<Company>
  delete(id: string): Promise<void>
}
