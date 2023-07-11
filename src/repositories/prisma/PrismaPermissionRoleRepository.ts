import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { PermissionsRolesRepository } from '../PermissionsRolesRepository'

export class PrismaPermissionRoleRepository
  implements PermissionsRolesRepository
{
  async create(data: Prisma.PermissionRoleUncheckedCreateInput) {
    await prisma.permissionRole.create({ data })
  }

  async findByRoleId(roleId: string) {
    const permissionRole = await prisma.permissionRole.findMany({
      where: {
        role_id: roleId,
      },
    })
    return permissionRole
  }

  async deleteByRoleId(roleId: string): Promise<void> {
    await prisma.permissionRole.deleteMany({
      where: {
        role_id: roleId,
      },
    })
  }
}
