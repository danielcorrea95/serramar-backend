import { TeamsRepository } from '@/repositories/TeamsRepository'
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError'
import { StorageProvider } from '@/shared/providers/storageProvider/StorageProvider'

interface UpdateShieldTeamRequest {
  teamId: string
  shieldFile: string
}

export class UploadShieldTeamUseCase {
  constructor(
    private teamsRepository: TeamsRepository,
    private storageProvider: StorageProvider,
  ) {}

  async execute({ teamId, shieldFile }: UpdateShieldTeamRequest) {
    const team = await this.teamsRepository.findById(teamId)

    if (!team) {
      throw new ResourceNotFoundError()
    }
    try {
      if (team.image) {
        // remove old image
        await this.storageProvider.delete(team.image, 'teams')
      }

      await this.storageProvider.save(shieldFile, 'teams')

      await this.teamsRepository.uploadImage(teamId, shieldFile)
    } catch (error) {
      console.log(error)
    }
  }
}
