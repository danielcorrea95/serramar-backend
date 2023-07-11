import { PrismaRoleRepository } from '@/repositories/prisma/PrismaRoleRepository'
import { CreateRoleUseCase } from '../rolesAndPermissions/CreateRoleUseCase'

export function MakeCreateRoleUseCase() {
  const prismaRoleRepository = new PrismaRoleRepository()
  const createRoleUseCase = new CreateRoleUseCase(prismaRoleRepository)

  return createRoleUseCase
}
