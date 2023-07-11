import { Permission, Prisma } from '@prisma/client'

export interface PermissionsRepository {
  create(data: Prisma.PermissionCreateInput): Promise<Permission>
  findAll(): Promise<Permission[]>
  findByName(name: string): Promise<Permission | null>
  findById(id: string): Promise<Permission | null>
  findByIds(id: string[]): Promise<Permission[]>
}
