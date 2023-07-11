import { PrismaCompaniesRepository } from '@/repositories/prisma/PrismaCompaniesRepository'
import { DeleteCompanyUseCase } from '../companies/DeteleCompanyUseCase'

export function MakeDeleteCompanyUseCase() {
  const prismaCompanRepository = new PrismaCompaniesRepository()
  const deleteCompanyUseCase = new DeleteCompanyUseCase(prismaCompanRepository)

  return deleteCompanyUseCase
}
