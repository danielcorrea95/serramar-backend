import { UpdateProfileUseCase } from '@/UseCases/users/UpdateProfileUseCase'
import { PrismaUserRepository } from '@/repositories/prisma/PrismaUserRepository'

export function MakeUpdateProfileUseCase() {
  const prismaUsersRepository = new PrismaUserRepository()
  const updateProfileUseCase = new UpdateProfileUseCase(prismaUsersRepository)

  return updateProfileUseCase
}
