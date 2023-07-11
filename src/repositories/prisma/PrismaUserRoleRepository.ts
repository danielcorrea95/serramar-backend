import { UserRole } from '@prisma/client'
import { UserRolesRepository } from '../UserRolesRepository'
import { prisma } from '@/lib/prisma'

export class PrismaUserRoleRepository implements UserRolesRepository {
  async createUserWithRole(userId: string, roleId: string): Promise<void> {
    await prisma.userRole.create({
      data: {
        user_id: userId,
        role_id: roleId,
      },
    })
  }

  async delete(userId: string): Promise<void> {
    await prisma.userRole.deleteMany({
      where: { user_id: userId },
    })
  }

  async findByUserId(userId: string): Promise<UserRole[]> {
    const userRoles = await prisma.userRole.findMany({
      where: {
        user_id: userId,
      },
    })
    console.log(userRoles)

    return userRoles
  }

  async findRolesByUserId(userId: string): Promise<string[]> {
    const userRoles = await prisma.userRole.findMany({
      where: {
        user_id: userId,
      },
      select: {
        Role: {
          select: {
            name: true,
          },
        },
      },
    })

    const returnRoles: string[] = []
    userRoles.forEach((role) => {
      returnRoles.push(role.Role.name)
    })

    return returnRoles
  }
}
