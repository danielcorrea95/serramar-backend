import { CategoryTeamTechnicalCommittee, Prisma } from '@prisma/client'

export interface CategoryTeamTechnicalCommitteeResponse {
  id: string
  name: string
  document: string
  technical_committee_type: string
}

export interface CategoryTeamTechnicalCommitteeRepository {
  create(
    data: Prisma.CategoryTeamTechnicalCommitteeUncheckedCreateInput,
  ): Promise<CategoryTeamTechnicalCommittee>

  findById(id: string): Promise<CategoryTeamTechnicalCommittee | null>

  findCategoryIdAndTeamId(
    categoryId: string,
    teamId: string,
  ): Promise<CategoryTeamTechnicalCommitteeResponse[]>

  findByTechnicalCommitteeIdAndCategoryId(
    technicalCommitteeId: string,
    categoryId: string,
  ): Promise<CategoryTeamTechnicalCommittee | null>

  findByTeamIdAndCategoryIdAndTechnicalCommitteeTypeId(
    teamId: string,
    categoryId: string,
    technicalCommitteeType: string,
  ): Promise<CategoryTeamTechnicalCommittee | null>

  findByTeamIdCategoryIdTechnicalCommitteeId(
    teamId: string,
    categoryId: string,
    technicalCommitteeId: string,
  ): Promise<CategoryTeamTechnicalCommittee | null>

  deleteLink(id: string): Promise<void>

  uploadTechnicalCommitteeImage(linkId: string, filename: string): Promise<void>
}
