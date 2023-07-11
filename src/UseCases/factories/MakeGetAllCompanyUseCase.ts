import { PrismaCompaniesRepository } from '@/repositories/prisma/PrismaCompaniesRepository'
import { GetAllCompanyUseCase } from '../companies/GetAllCompanyUseCase'

export function MakeGetAllCompanyUseCase() {
  const prismaCompanRepository = new PrismaCompaniesRepository()
  const getAllCompanyUseCase = new GetAllCompanyUseCase(prismaCompanRepository)

  return getAllCompanyUseCase
}
