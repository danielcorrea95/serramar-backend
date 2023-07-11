import { env } from '@/env'
import { PrismaCategoryPlayerTeamRepository } from '@/repositories/prisma/PrismaCategoryPlayerTeamRepository'
import { LocalStorageProvider } from '@/shared/providers/storageProvider/implementations/LocalStorageProvider'
import { S3StorageProvider } from '@/shared/providers/storageProvider/implementations/S3StorageProvider'
import { UploadImagePlayerUseCase } from '@/UseCases/cups/categoryPlayerTeam/UploadImagePlayerUseCase'

export function MakeUploadImagePlayerUseCase() {
  let storageProvider = null
  const categoryPlayerTeamRepository = new PrismaCategoryPlayerTeamRepository()
  if (env.NODE_ENV === 'production') {
    storageProvider = new S3StorageProvider()
  } else {
    storageProvider = new LocalStorageProvider()
  }

  const useCase = new UploadImagePlayerUseCase(
    categoryPlayerTeamRepository,
    storageProvider,
  )

  return useCase
}
