import { User, Prisma } from '@prisma/client'
import { UsersRepository } from '../UsersRepository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }
    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }
    return user
  }

  async findByUsername(username: string) {
    const user = this.items.find((item) => item.username === username)

    if (!user) {
      return null
    }
    return user
  }

  async create(data: Prisma.UserUncheckedCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email ? data.email : null,
      username: data.username,
      password_hash: data.password_hash,
      is_admin: false,
      role_id: data.role_id,
      deleted: false,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(user)

    return user
  }

  async listAllUsers(): Promise<User[]> {
    const users = this.items

    return users
  }
}
