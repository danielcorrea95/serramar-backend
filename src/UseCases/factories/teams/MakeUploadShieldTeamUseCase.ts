import { UploadShieldTeamUseCase } from '@/UseCases/teams/UploadShieldTeamUseCase'
import { env } from '@/env'
import { PrismaTeamsRepository } from '@/repositories/prisma/PrismaTeamsRepository'
import { LocalStorageProvider } from '@/shared/providers/storageProvider/implementations/LocalStorageProvider'
import { S3StorageProvider } from '@/shared/providers/storageProvider/implementations/S3StorageProvider'

export function MakeUploadShieldTeamUseCase() {
  let uploadStorage = null
  const prismaTeamsRepository = new PrismaTeamsRepository()
  if (env.NODE_ENV === 'production') {
    uploadStorage = new S3StorageProvider()
  } else {
    uploadStorage = new LocalStorageProvider()
  }

  const listTeamsByUserIdUseCase = new UploadShieldTeamUseCase(
    prismaTeamsRepository,
    uploadStorage,
  )

  return listTeamsByUserIdUseCase
}
