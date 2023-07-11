import { Prisma, Role } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { RolesRepository } from '../RolesRepository'

export class PrismaRoleRepository implements RolesRepository {
  async create(data: Prisma.RoleCreateInput) {
    const role = await prisma.role.create({
      data,
    })

    return role
  }

  async findAll() {
    const roles = await prisma.role.findMany()

    return roles
  }

  async findByName(name: string): Promise<Role | null> {
    const role = await prisma.role.findFirst({
      where: { name },
    })

    return role
  }

  async findById(id: string) {
    const role = await prisma.role.findFirst({
      where: { id },
    })

    return role
  }

  async findByRoleIds(ids: string[]) {
    console.log(ids)
    const roles = await prisma.role.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    })

    return roles
  }
}
