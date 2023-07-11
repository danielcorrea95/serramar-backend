import { RolesRepository } from '@/repositories/RolesRepository'
import { PermissionsRepository } from '@/repositories/PermissionsRepository'
import { PermissionsRolesRepository } from '@/repositories/PermissionsRolesRepository'
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError'

interface CreateRolePermissionRequest {
  roleId: string
  permissionId: string[]
}

export class CreatePermissionRoleUseCase {
  constructor(
    private roleRepository: RolesRepository,
    private permissionsRepository: PermissionsRepository,
    private permissionsRolesRepository: PermissionsRolesRepository,
  ) {}

  async execute({ roleId, permissionId }: CreateRolePermissionRequest) {
    const role = await this.roleRepository.findById(roleId)

    if (!role) {
      throw new ResourceNotFoundError()
    }

    const permissionsRolesExists =
      await this.permissionsRolesRepository.findByRoleId(roleId)

    if (permissionsRolesExists) {
      await this.permissionsRolesRepository.deleteByRoleId(roleId)
    }

    const permissionsExists = await this.permissionsRepository.findByIds(
      permissionId,
    )

    permissionsExists.map(async (permission) => {
      await this.permissionsRolesRepository.create({
        role_id: role.id,
        permission_id: permission.id,
      })
    })

    return role
  }
}
