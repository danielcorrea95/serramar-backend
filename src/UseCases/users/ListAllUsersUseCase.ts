import { UsersRepository } from '@/repositories/UsersRepository'
import { UserRolesRepository } from '@/repositories/UserRolesRepository'
import { TeamsRepository } from '@/repositories/TeamsRepository'

interface AllUsersResponde {
  id: string
  name: string
  email: string | null
  username: string
  is_admin: boolean
  sel_team_id: string | null
  sel_cup_config_id: string | null
  sel_category_id: string | null
  role: string
  team: string
}

export class ListAllUsersUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private userRoleRepository: UserRolesRepository,
    private teamRepository: TeamsRepository,
  ) {}

  async execute(): Promise<AllUsersResponde[]> {
    const users = await this.usersRepository.listAllUsers()
    const responseUser: AllUsersResponde[] = []

    await Promise.all(
      users.map(async (item) => {
        const roleName = await this.userRoleRepository.findRolesByUserId(
          item.id,
        )
        const team = await this.teamRepository.findTeamsByUserId(item.id)
        let teamName = ''

        if (team.length > 1) {
          teamName = '*'
        } else if (team.length === 1) {
          teamName = team[0].name
        }

        const infoUser = {
          ...item,
          password_hash: undefined,
          role: roleName[0],
          team: teamName,
        }

        responseUser.push(infoUser)
      }),
    )
    return responseUser
  }
}
