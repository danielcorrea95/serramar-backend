import { PrismaCompaniesRepository } from '@/repositories/prisma/PrismaCompaniesRepository'
import { UpdateCompanyUseCase } from '../companies/UpdateCompanyUseCase'

export function MakeUpdateCompanyUseCase() {
  const prismaCompanRepository = new PrismaCompaniesRepository()
  const updateCompanyUseCase = new UpdateCompanyUseCase(prismaCompanRepository)

  return updateCompanyUseCase
}
