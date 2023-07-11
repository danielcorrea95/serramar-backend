import { CreateCompanyUseCase } from '@/UseCases/companies/CreateCompanyUseCase'
import { PrismaCompaniesRepository } from '@/repositories/prisma/PrismaCompaniesRepository'
import { PrismaCompanyUserRepository } from '@/repositories/prisma/PrismaCompanyUserRepository'
import { PrismaUserRepository } from '@/repositories/prisma/PrismaUserRepository'

export function MakeCreateCompanyUseCase() {
  const prismaCompaniesRepository = new PrismaCompaniesRepository()
  const usersRepository = new PrismaUserRepository()
  const companyUserRepository = new PrismaCompanyUserRepository()
  const createCompanyUseCase = new CreateCompanyUseCase(
    prismaCompaniesRepository,
    usersRepository,
    companyUserRepository,
  )

  return createCompanyUseCase
}
