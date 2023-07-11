import { State } from '@prisma/client'

export interface StatesRepository {
  findAll(): Promise<State[]>
}
