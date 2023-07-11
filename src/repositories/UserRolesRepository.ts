import { UserRole } from '@prisma/client'

export interface UserRolesRepository {
  createUserWithRole(userId: string, roleId: string): Promise<void>
  delete(userId: string): Promise<void>
  findByUserId(userId: string): Promise<UserRole[]>
  findRolesByUserId(userId: string): Promise<string[]>
}
