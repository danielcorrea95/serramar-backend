import { State } from '@prisma/client'
import { StatesRepository } from '../StatesRepository'
import { prisma } from '@/lib/prisma'

export class PrismaStateRepository implements StatesRepository {
  async findAll(): Promise<State[]> {
    const states = await prisma.state.findMany()

    return states
  }
}
