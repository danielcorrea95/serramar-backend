import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'

export function can(permissions: string[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { user } = request

    const account = await prisma.user.findFirst({
      where: { id: user.sub },
      select: {
        UserPermission: {
          include: {
            Permission: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })

    if (!account) {
      return reply.status(400).send({ message: 'User does not exists' })
    }

    const permissionExists = account.UserPermission.map(
      (permission) => permission.Permission.name,
    ).some((permission) => permissions.includes(permission))

    if (!permissionExists) {
      return reply.status(401).send()
    }
  }
}

export function is(rolesRoutes: string[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { user } = request

    const account = await prisma.user.findFirst({
      where: { id: user.sub },
      select: {
        UserRole: {
          include: {
            Role: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })

    if (!account) {
      return reply.status(400).send({ message: 'User does not exists' })
    }

    const roleExists = account.UserRole.map((role) => role.Role.name).some(
      (role) => rolesRoutes.includes(role),
    )

    if (!roleExists) {
      return reply.status(401).send()
    }
  }
}
