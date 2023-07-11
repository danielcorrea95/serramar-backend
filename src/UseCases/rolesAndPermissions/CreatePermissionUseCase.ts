import { PermissionsRepository } from '@/repositories/PermissionsRepository'
import { PermissionAlreadyExistsError } from '../errors/PermissionAlreadyExistsError'

interface CreatePermissionRequest {
  name: string
  description: string | null
}

export class CreatePermissionUseCase {
  constructor(private permissionsRepository: PermissionsRepository) {}

  async execute({ name, description }: CreatePermissionRequest) {
    const permissionAlreadyExists = await this.permissionsRepository.findByName(
      name,
    )
    if (permissionAlreadyExists) {
      throw new PermissionAlreadyExistsError()
    }

    const permission = await this.permissionsRepository.create({
      name,
      description,
    })

    return permission
  }
}
