import { UserPermission } from '@prisma/client'
import { UserPermissionsRepository } from '../UserPermissionsRepository'
import { prisma } from '@/lib/prisma'

export class PrismaUserPermissionRepository
  implements UserPermissionsRepository
{
  async create(userId: string, permissions: string) {
    await prisma.userPermission.createMany({
      data: [
        {
          user_id: userId,
          permission_id: permissions,
        },
      ],
    })
  }

  async delete(userId: string) {
    await prisma.userPermission.deleteMany({
      where: {
        user_id: userId,
      },
    })
  }

  async findByUserId(userId: string): Promise<UserPermission[]> {
    const permissions = await prisma.userPermission.findMany({
      where: {
        user_id: userId,
      },
    })

    return permissions
  }

  async findPermissionsByUserId(userId: string): Promise<string[]> {
    const permissions = await prisma.userPermission.findMany({
      where: {
        user_id: userId,
      },
      select: {
        Permission: {
          select: {
            name: true,
          },
        },
      },
    })

    const returnPermissionUser: string[] = []

    permissions.forEach((permission) => {
      returnPermissionUser.push(permission.Permission.name)
    })

    return returnPermissionUser
  }
}
