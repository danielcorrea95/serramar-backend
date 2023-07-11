import { RolesRepository } from '@/repositories/RolesRepository'
import { UserRolesRepository } from '@/repositories/UserRolesRepository'

interface RoleResponse {
  id: string
  name: string
}

export class GetRolesUseCase {
  constructor(
    private rolesRepository: RolesRepository,
    private userRoleRepository: UserRolesRepository,
  ) {}

  async execute(userId: string): Promise<RoleResponse[]> {
    const roleName = await this.userRoleRepository.findRolesByUserId(userId)

    const allRoles = await this.rolesRepository.findAll()

    const returnRoles: RoleResponse[] = []

    if (roleName[0] === 'admin') {
      allRoles.map((item) =>
        returnRoles.push({
          id: item.id,
          name: item.name,
        }),
      )
    }

    if (roleName[0] === 'gestor competição') {
      allRoles.forEach((item) => {
        if (item.name !== 'admin') {
          returnRoles.push({
            id: item.id,
            name: item.name,
          })
        }
      })
    }

    return returnRoles
  }
}
