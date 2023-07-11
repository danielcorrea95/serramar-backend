import { Prisma, UserToken } from '@prisma/client'

export interface UsersTokensRepository {
  create(data: Prisma.UserTokenUncheckedCreateInput): Promise<UserToken>
  findByUserId(userId: string): Promise<UserToken[]>
  findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<UserToken | null>
  deleteById(id: string): Promise<void>
}
