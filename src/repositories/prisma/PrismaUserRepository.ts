import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import {
  UpdateContextUserProps,
  UserProps,
  UsersRepository,
} from '../UsersRepository'

export class PrismaUserRepository implements UsersRepository {
  async create(data: Prisma.UserUncheckedCreateInput) {
    const user = await prisma.user.create({
      data,
    })
    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findFirst({
      where: {
        id,
        deleted: false,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findByUsername(username: string) {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    })

    return user
  }

  async listAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: {
        deleted: false,
      },
    })

    return users
  }

  async findByEmailOtherThanTheEmailEntered(
    id: string,
    email: string,
  ): Promise<User | null> {
    const emailAlreadyExists = await prisma.user.findFirst({
      where: {
        id: { not: id },
        email,
      },
    })

    return emailAlreadyExists
  }

  async update(
    id: string,
    name: string,
    email: string,
    password_hash: string,
  ): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password_hash,
      },
    })

    return user
  }

  async findByRoleName(roleName: string): Promise<UserProps[]> {
    const users: UserProps[] =
      await prisma.$queryRaw`SELECT u.id, u.name, u.username FROM users AS u
    LEFT JOIN users_roles AS ur ON ur.user_id = u.id
    LEFT JOIN roles AS r ON r.id = ur.role_id
    WHERE r.name = ${roleName}
    GROUP BY u.id
    `

    return users
  }

  async updateContext({
    userId,
    teamId,
    cupConfigId,
    categoryId,
  }: UpdateContextUserProps): Promise<void> {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        sel_team_id: teamId,
        sel_cup_config_id: cupConfigId,
        sel_category_id: categoryId,
      },
    })
  }
}
