import { PermissionRole, Prisma } from '@prisma/client'

export interface PermissionsRolesRepository {
  create(data: Prisma.PermissionRoleUncheckedCreateInput): Promise<void>
  findByRoleId(roleId: string): Promise<PermissionRole[]>
  deleteByRoleId(roleId: string): Promise<void>
}
