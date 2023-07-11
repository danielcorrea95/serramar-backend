export interface TeamUserRepository {
  create(userId: string, teamId: string): Promise<void>
  delete(userId: string, teamId: string): Promise<void>
}
