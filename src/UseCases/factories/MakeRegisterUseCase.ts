import { PrismaUserRepository } from '@/repositories/prisma/PrismaUserRepository'
import { RegisterUseCase } from '../users/RegisterUseCase'

export function MakeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUserRepository()
  const registerUseCase = new RegisterUseCase(prismaUsersRepository)

  return registerUseCase
}
