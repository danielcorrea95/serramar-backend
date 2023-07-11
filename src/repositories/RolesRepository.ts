import { Prisma, Role } from '@prisma/client'

export interface RolesRepository {
  create(data: Prisma.RoleCreateInput): Promise<Role>
  findAll(): Promise<Role[]>
  findByName(name: string): Promise<Role | null>
  findById(id: string): Promise<Role | null>
  findByRoleIds(ids: string[]): Promise<Role[]>
}
