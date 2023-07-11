import { PrismaCompaniesRepository } from '@/repositories/prisma/PrismaCompaniesRepository'
import { GetCompanyByIdUseCase } from '../companies/GetCompanyByIdUseCase'

export function MakeGetCompanyByIdUseCase() {
  const prismaCompanRepository = new PrismaCompaniesRepository()
  const getCompanyByIdUseCase = new GetCompanyByIdUseCase(
    prismaCompanRepository,
  )

  return getCompanyByIdUseCase
}
