import { GetGroupsByCategoryIdUseCase } from '@/UseCases/cups/group/GetGroupsByCategoryIdUseCase'
import { PrismaGroupsRepository } from '@/repositories/prisma/PrismaGroupsRepository'

export function MakeGetGroupsByCategoryIdUseCase() {
  const prismaGroupRepository = new PrismaGroupsRepository()
  const getGroupsByCategoryIdUseCase = new GetGroupsByCategoryIdUseCase(
    prismaGroupRepository,
  )

  return getGroupsByCategoryIdUseCase
}
