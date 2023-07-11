import { CompanyUserRepository } from '../CompanyUserRepository'
import { prisma } from '@/lib/prisma'

export class PrismaCompanyUserRepository implements CompanyUserRepository {
  async create(companyId: string, userId: string): Promise<void> {
    await prisma.companyUser.create({
      data: {
        company_id: companyId,
        user_id: userId,
      },
    })
  }

  async deleteByUserId(userId: string): Promise<void> {
    await prisma.companyUser.deleteMany({
      where: {
        user_id: userId,
      },
    })
  }

  async deleteByCompanyId(companyId: string): Promise<void> {
    await prisma.companyUser.deleteMany({
      where: {
        company_id: companyId,
      },
    })
  }
}
