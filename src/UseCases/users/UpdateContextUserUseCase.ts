import { CategoriesRepository } from '@/repositories/CategoriesRepository'
import { TeamsRepository } from '@/repositories/TeamsRepository'
import {
  UpdateContextUserProps,
  UsersRepository,
} from '@/repositories/UsersRepository'
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError'
import { CupConfigRepository } from '@/repositories/CupConfigRepository'

interface contextReturn {
  teamName: string
  cupConfigName: string | null
  categoryName: string
}

export class UpdateContextUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private teamsRepository: TeamsRepository,
    private cupConfigRepository: CupConfigRepository,
    private categoriesRepository: CategoriesRepository,
  ) {}

  async execute({
    userId,
    teamId,
    cupConfigId,
    categoryId,
  }: UpdateContextUserProps): Promise<contextReturn> {
    let teamName = null
    let cupConfigName = null
    let categoryName = null
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    await this.usersRepository.updateContext({
      userId,
      teamId,
      cupConfigId,
      categoryId,
    })

    if (teamId) {
      teamName = await this.teamsRepository.findById(teamId)
    }

    if (cupConfigId) {
      cupConfigName = await this.cupConfigRepository.findById(cupConfigId)
      console.log(cupConfigName?.name)
    }

    if (categoryId) {
      categoryName = await this.categoriesRepository.findById(categoryId)
    }

    return {
      teamName: teamName ? teamName.name : 'Todos',
      cupConfigName: cupConfigName ? cupConfigName.name : 'Todos',
      categoryName: categoryName ? categoryName.name : 'Todos',
    }
  }
}
