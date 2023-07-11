import { CategoryPlayerTeamRepository } from '@/repositories/CategoryPlayerTeamRepository'
import { StorageProvider } from '@/shared/providers/storageProvider/StorageProvider'
import { ResourceNotFoundError } from '@/UseCases/errors/ResourceNotFoundError'

interface UploadImagePlayerRequest {
  linkId: string
  filename: string
}

export class UploadImagePlayerUseCase {
  constructor(
    private categoryPlayerTeamRepository: CategoryPlayerTeamRepository,
    private storageProvider: StorageProvider,
  ) {}

  async execute({ linkId, filename }: UploadImagePlayerRequest) {
    const linkExists = await this.categoryPlayerTeamRepository.findById(linkId)

    if (!linkExists) {
      throw new ResourceNotFoundError()
    }

    if (linkExists.avatar) {
      // remove old image
      await this.storageProvider.delete(linkExists.avatar, 'players')
    }

    await this.storageProvider.save(filename, 'players')

    await this.categoryPlayerTeamRepository.uploadPlayerImage(linkId, filename)
  }
}
