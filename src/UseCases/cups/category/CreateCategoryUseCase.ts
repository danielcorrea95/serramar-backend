import { prisma } from '@/lib/prisma'
import { CategoriesRepository } from '@/repositories/CategoriesRepository'
import { GroupsRepository } from '@/repositories/GroupsRepository'
import { Category, Group } from '@prisma/client'

interface CreateCategoryUseCaseRequest {
  cupConfigId: string
  name: string
  amountGroup: number
  amountNextPhase: number
  amountTeams: number
}

interface CreateCategoryUseCaseResponse {
  category: Category
  groups: Group[]
}

interface CreateGroupResponse {
  groups: Group[]
}

export class CreateCategoryUseCase {
  constructor(
    private categoriesRepository: CategoriesRepository,
    public groupsRepository: GroupsRepository,
  ) {}

  async execute({
    cupConfigId,
    name,
    amountGroup,
    amountNextPhase,
    amountTeams,
  }: CreateCategoryUseCaseRequest): Promise<CreateCategoryUseCaseResponse> {
    const category = await this.categoriesRepository.create({
      cup_config_id: cupConfigId,
      name,
      amount_groups: amountGroup,
      amount_next_phase: amountNextPhase,
      amount_teams: amountTeams,
    })

    const { groups } = await createGroup(category.id, amountGroup)

    return { category, groups }
  }
}

async function createGroup(
  category_id: string,
  amount_groups: number,
): Promise<CreateGroupResponse> {
  const groupName: string[] = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'I',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ]

  const groups: Group[] = []

  for (let i = 0; i <= amount_groups; i++) {
    const name = 'Grupo ' + groupName[i]
    const data = {
      category_id,
      name,
    }

    const group = await prisma.group.create({ data })
    groups.push(group)
  }
  return { groups }
}
