import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { PermissionsRepository } from '../PermissionsRepository'

export class PrismaPermissionRepository implements PermissionsRepository {
  async create(data: Prisma.PermissionCreateInput) {
    const permission = await prisma.permission.create({ data })

    return permission
  }

  async findAll() {
    const permissions = await prisma.permission.findMany()

    return permissions
  }

  async findByName(name: string) {
    const permission = await prisma.permission.findFirst({
      where: { name },
    })

    return permission
  }

  async findById(id: string) {
    const permission = await prisma.permission.findFirst({
      where: { id },
    })

    return permission
  }

  async findByIds(id: string[]) {
    const permission = await prisma.permission.findMany({
      where: {
        id: {
          in: id,
        },
      },
    })

    return permission
  }
}
