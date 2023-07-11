import { Prisma, User } from '@prisma/client'

export interface UserProps {
  id: string
  name: string
  username: string
}

export interface UpdateContextUserProps {
  userId: string
  teamId: string | null
  cupConfigId: string | null
  categoryId: string | null
}

export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findByUsername(username: string): Promise<User | null>
  create(data: Prisma.UserUncheckedCreateInput): Promise<User>
  listAllUsers(): Promise<User[]>
  findByEmailOtherThanTheEmailEntered(
    id: string,
    email: string,
  ): Promise<User | null>
  update(
    id: string,
    name: string,
    email: string,
    password_hash: string,
  ): Promise<User>
  findByRoleName(roleName: string): Promise<UserProps[]>
  updateContext({
    userId,
    teamId,
    cupConfigId,
    categoryId,
  }: UpdateContextUserProps): Promise<void>
}
