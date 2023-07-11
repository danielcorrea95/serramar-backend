import { UserPermission } from '@prisma/client'

export interface UserPermissionsRepository {
  create(userId: string, permissions: string): Promise<void>
  delete(userId: string): Promise<void>
  findByUserId(userId: string): Promise<UserPermission[]>
  findPermissionsByUserId(userId: string): Promise<string[]>
}
