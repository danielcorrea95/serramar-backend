import { env } from '@/env'
import { PrismaCategoryTeamTechnicalCommitteeRepository } from '@/repositories/prisma/PrismaCategoryTeamTechnicalCommitteeRepository'
import { LocalStorageProvider } from '@/shared/providers/storageProvider/implementations/LocalStorageProvider'
import { S3StorageProvider } from '@/shared/providers/storageProvider/implementations/S3StorageProvider'
import { UploadImageTechnicalCommitteeUseCase } from '@/UseCases/cups/categoryTeamTechnicalCommittee/UploadImageTechnicalCommitteeUseCase'

export function MakeUploadImageTechnicalCommitteeUseCase() {
  let storageProvider = null
  const crismaCategoryTeamTechnicalCommitteeRepository =
    new PrismaCategoryTeamTechnicalCommitteeRepository()
  if (env.NODE_ENV === 'production') {
    storageProvider = new S3StorageProvider()
  } else {
    storageProvider = new LocalStorageProvider()
  }

  const uploadImageTechnicalCommitteeUseCase =
    new UploadImageTechnicalCommitteeUseCase(
      crismaCategoryTeamTechnicalCommitteeRepository,
      storageProvider,
    )

  return uploadImageTechnicalCommitteeUseCase
}
