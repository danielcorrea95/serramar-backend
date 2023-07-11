import { Prisma, UserToken } from '@prisma/client'
import { UsersTokensRepository } from '../UsersTokensRepository'

export class InMemoryUsersTokensRepository implements UsersTokensRepository {
  public items: UserToken[] = []

  async create(data: Prisma.UserTokenUncheckedCreateInput) {
    const userToken = {
      id: data.id ? data.id : 'user-token-id',
      refresh_token: data.refresh_token,
      user_id: data.user_id,
      expires_date: new Date(data.expires_date),
      created_at: new Date(),
    }

    this.items.push(userToken)

    return userToken
  }

  findByUserId(userId: string): Promise<UserToken[]> {
    throw new Error('Method not implemented.')
  }

  findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<UserToken | null> {
    throw new Error('Method not implemented.')
  }

  deleteById(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
