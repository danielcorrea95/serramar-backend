import { Prisma, CategoryTeamTechnicalCommittee } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import {
  CategoryTeamTechnicalCommitteeRepository,
  CategoryTeamTechnicalCommitteeResponse,
} from '../CategoryTeamTechnicalCommitteeRepository'

export class PrismaCategoryTeamTechnicalCommitteeRepository
  implements CategoryTeamTechnicalCommitteeRepository
{
  async create(
    data: Prisma.CategoryTeamTechnicalCommitteeUncheckedCreateInput,
  ): Promise<CategoryTeamTechnicalCommittee> {
    const categoryTeamTechnicalCommittee =
      await prisma.categoryTeamTechnicalCommittee.create({ data })

    return categoryTeamTechnicalCommittee
  }

  async findByTechnicalCommitteeIdAndCategoryId(
    technicalCommitteeId: string,
    categoryId: string,
  ): Promise<CategoryTeamTechnicalCommittee | null> {
    const categoryTeamTechnicalCommittee =
      await prisma.categoryTeamTechnicalCommittee.findFirst({
        where: {
          technical_committee_id: technicalCommitteeId,
          category_id: categoryId,
          deleted: false,
        },
      })

    return categoryTeamTechnicalCommittee
  }

  async findByTeamIdAndCategoryIdAndTechnicalCommitteeTypeId(
    teamId: string,
    categoryId: string,
    technicalCommitteeType: string,
  ): Promise<CategoryTeamTechnicalCommittee | null> {
    const categoryTeamTechnicalCommittee =
      await prisma.categoryTeamTechnicalCommittee.findFirst({
        where: {
          team_id: teamId,
          category_id: categoryId,
          technical_committee_type_id: technicalCommitteeType,
          deleted: false,
        },
      })

    return categoryTeamTechnicalCommittee
  }

  async findById(id: string): Promise<CategoryTeamTechnicalCommittee | null> {
    const categoryTeamTechnicalCommittee =
      await prisma.categoryTeamTechnicalCommittee.findFirst({
        where: {
          id,
          deleted: false,
        },
      })

    return categoryTeamTechnicalCommittee
  }

  async uploadTechnicalCommitteeImage(
    linkId: string,
    filename: string,
  ): Promise<void> {
    await prisma.categoryTeamTechnicalCommittee.update({
      where: {
        id: linkId,
      },
      data: {
        avatar: filename,
      },
    })
  }

  async findCategoryIdAndTeamId(
    categoryId: string,
    teamId: string,
  ): Promise<CategoryTeamTechnicalCommitteeResponse[]> {
    const categoryTeamTechnicalCommittee: CategoryTeamTechnicalCommitteeResponse[] =
      await prisma.$queryRaw`SELECT tc.id, tc.phone, tc.name, tc.document, 
            tct.name as technical_committee_type 
            FROM category_team_technical_committee AS cttc
            LEFT JOIN technical_committee AS tc ON tc.id = cttc.technical_committee_id
            LEFT JOIN technical_committee_types AS tct ON tct.id = cttc.technical_committee_type_id
            WHERE cttc.team_id = ${teamId} AND cttc.category_id = ${categoryId} AND cttc.deleted = false
            GROUP BY tc.id, tct.name`

    return categoryTeamTechnicalCommittee
  }

  async findByTeamIdCategoryIdTechnicalCommitteeId(
    teamId: string,
    categoryId: string,
    technicalCommitteeId: string,
  ): Promise<CategoryTeamTechnicalCommittee | null> {
    const link = await prisma.categoryTeamTechnicalCommittee.findFirst({
      where: {
        team_id: teamId,
        category_id: categoryId,
        technical_committee_id: technicalCommitteeId,
        deleted: false,
      },
    })
    return link
  }

  async deleteLink(id: string): Promise<void> {
    await prisma.categoryTeamTechnicalCommittee.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    })
  }
}
