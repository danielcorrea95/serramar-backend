import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { UsersTokensRepository } from '../UsersTokensRepository'

export class PrismaUserTokenRepository implements UsersTokensRepository {
  async create(data: Prisma.UserTokenUncheckedCreateInput) {
    const userToken = await prisma.userToken.create({ data })

    return userToken
  }

  async findByUserId(userId: string) {
    const userToken = await prisma.userToken.findMany({
      where: {
        user_id: userId,
      },
    })

    return userToken
  }

  async findByUserIdAndRefreshToken(userId: string, refreshToken: string) {
    const userToken = await prisma.userToken.findFirst({
      where: {
        user_id: userId,
        refresh_token: refreshToken,
      },
    })

    return userToken
  }

  async deleteById(id: string) {
    await prisma.userToken.delete({
      where: {
        id,
      },
    })
  }
}
