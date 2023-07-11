export interface CompanyUserRepository {
  create(companyId: string, userId: string): Promise<void>
  deleteByUserId(userId: string): Promise<void>
  deleteByCompanyId(companyId: string): Promise<void>
}
