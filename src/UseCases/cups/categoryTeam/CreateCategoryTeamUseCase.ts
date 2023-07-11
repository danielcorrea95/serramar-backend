import { ResourceNotFoundError } from '@/UseCases/errors/ResourceNotFoundError'
import { CategoriesRepository } from '@/repositories/CategoriesRepository'
import { CategoryTeamRepository } from '@/repositories/CategoryTeamRepository'
import { TeamUserRepository } from '@/repositories/TeamUserRepository'
import { UsersRepository } from '@/repositories/UsersRepository'

interface CreateCategoryTeamRequest {
  categoryId: string
  teamId: string
}

export class CreateCategoryTeamUseCase {
  constructor(
    private categoryTeamRepository: CategoryTeamRepository,
    private categoriesRepository: CategoriesRepository,
    private usersRepository: UsersRepository,
    private teamUsersRepository: TeamUserRepository,
  ) {}

  async execute({ categoryId, teamId }: CreateCategoryTeamRequest) {
    const category = await this.categoriesRepository.findById(categoryId)

    if (!category) {
      throw new ResourceNotFoundError()
    }
    console.log(category)

    const link = await this.categoryTeamRepository.create(categoryId, teamId)

    console.log(link)

    const usersOfRoleGestorCompeticao =
      await this.usersRepository.findByRoleName('gestor competição')

    if (usersOfRoleGestorCompeticao) {
      usersOfRoleGestorCompeticao.map(async (item) => {
        // adiciona equipe para todos os administradores
        await this.teamUsersRepository.create(item.id, teamId)
      })
    }

    return category
  }
}
