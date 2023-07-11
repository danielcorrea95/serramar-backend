import { RolesRepository } from '@/repositories/RolesRepository'
import { RoleAlreadyExistsError } from '../errors/RoleAlreadyExistsError'

interface CreateRoleRequest {
  name: string
  description: string | null
}

export class CreateRoleUseCase {
  constructor(private rolesRepository: RolesRepository) {}

  async execute({ name, description }: CreateRoleRequest) {
    const roleAlreadyExists = await this.rolesRepository.findByName(name)

    if (roleAlreadyExists) {
      throw new RoleAlreadyExistsError()
    }

    const role = await this.rolesRepository.create({ name, description })

    return role
  }
}
