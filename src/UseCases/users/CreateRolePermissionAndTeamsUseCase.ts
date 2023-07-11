import { CategoriesRepository } from '@/repositories/CategoriesRepository'
import { PermissionsRolesRepository } from '@/repositories/PermissionsRolesRepository'
import { RolesRepository } from '@/repositories/RolesRepository'
import { TeamsRepository } from '@/repositories/TeamsRepository'
import { TeamUserRepository } from '@/repositories/TeamUserRepository'
import { UserPermissionsRepository } from '@/repositories/UserPermissionsRepository'
import { UserRolesRepository } from '@/repositories/UserRolesRepository'
import { UsersRepository } from '@/repositories/UsersRepository'
import { ResourceNotFoundError } from '@/UseCases/errors/ResourceNotFoundError'

interface CreateRolePermissionAndTeamsProps {
  userId: string
  roleName: string
  teamId: string | null
  cupConfigId: string
}
export class CreateRolePermissionAndTeamsUseCase {
  constructor(
    private userRepository: UsersRepository,
    private roleRepository: RolesRepository,
    private userRolesRepository: UserRolesRepository,
    private permissionRolesRepository: PermissionsRolesRepository,
    private userPermissionsRepository: UserPermissionsRepository,
    private teamUserRepository: TeamUserRepository,
    private teamsRepository: TeamsRepository,
    private categoryRepository: CategoriesRepository,
  ) {}

  async execute({
    userId,
    roleName,
    teamId,
    cupConfigId,
  }: CreateRolePermissionAndTeamsProps) {
    let contextSelTeamId = ''
    const contextSelCupConfigId = cupConfigId
    let contextSelCategoryId = ''
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const role = await this.roleRepository.findByName(roleName)

    if (!role) {
      throw new ResourceNotFoundError()
    }
    const roleId = role.id

    await this.userRolesRepository.createUserWithRole(userId, roleId)

    const permissions = await this.permissionRolesRepository.findByRoleId(
      roleId,
    )

    permissions.forEach(async (item) => {
      await this.userPermissionsRepository.create(userId, item.permission_id)
    })

    if (roleName === 'gestor equipe') {
      if (teamId) {
        contextSelTeamId = teamId
        await this.teamUserRepository.create(userId, teamId)
      }
    } else if (roleName === 'gestor competição' || roleName === 'arbitragem') {
      // consulta todas categorias da cup config e retorna todas as equipes cadastradas
      const teams = await this.teamsRepository.findByCupConfigId(cupConfigId)
      contextSelTeamId = teams[0].id

      teams.forEach(async (item) => {
        await this.teamUserRepository.create(userId, item.id)
      })
    } else {
      const page = 1
      const limitQueryPage = 999999
      // se for admin cadastra todos os times
      const teams = await this.teamsRepository.findAll(page, limitQueryPage)
      contextSelTeamId = teams[0].id

      teams.forEach(async (item) => {
        await this.teamUserRepository.create(userId, item.id)
      })
    }

    const categories = await this.categoryRepository.findByCupConfigIdAndTeamId(
      contextSelCupConfigId,
      contextSelTeamId,
    )
    contextSelCategoryId = categories[0].id

    const dataUpdateContext = {
      userId,
      teamId: contextSelTeamId,
      cupConfigId: contextSelCupConfigId,
      categoryId: contextSelCategoryId,
    }

    console.log(dataUpdateContext)

    await this.userRepository.updateContext(dataUpdateContext)
  }
}
