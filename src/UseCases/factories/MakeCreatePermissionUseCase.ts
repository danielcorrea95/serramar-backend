import { PrismaPermissionRepository } from '@/repositories/prisma/PrismaPermissionRepository'
import { CreatePermissionUseCase } from '../rolesAndPermissions/CreatePermissionUseCase'
export function MakeCreatePermissionUseCase() {
  const prismaPermissionRepository = new PrismaPermissionRepository()
  const createPermissionUseCase = new CreatePermissionUseCase(
    prismaPermissionRepository,
  )

  return createPermissionUseCase
}
