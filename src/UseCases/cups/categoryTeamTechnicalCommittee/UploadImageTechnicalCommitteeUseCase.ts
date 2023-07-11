import { CategoryTeamTechnicalCommitteeRepository } from '@/repositories/CategoryTeamTechnicalCommitteeRepository'
import { StorageProvider } from '@/shared/providers/storageProvider/StorageProvider'
import { ResourceNotFoundError } from '@/UseCases/errors/ResourceNotFoundError'

interface UploadImageTechnicalCommitteeRequest {
  linkId: string
  filename: string
}

export class UploadImageTechnicalCommitteeUseCase {
  constructor(
    private categoryTeamTechnicalCommitteeRepository: CategoryTeamTechnicalCommitteeRepository,
    private storageProvider: StorageProvider,
  ) {}

  async execute({ linkId, filename }: UploadImageTechnicalCommitteeRequest) {
    const linkExists =
      await this.categoryTeamTechnicalCommitteeRepository.findById(linkId)

    if (!linkExists) {
      throw new ResourceNotFoundError()
    }

    if (linkExists.avatar) {
      // remove old image
      await this.storageProvider.delete(
        linkExists.avatar,
        'technical-committee',
      )
    }

    await this.storageProvider.save(filename, 'technical-committee')

    await this.categoryTeamTechnicalCommitteeRepository.uploadTechnicalCommitteeImage(
      linkId,
      filename,
    )
  }
}
