import { Prisma, CategoryPlayerTeam } from '@prisma/client'
import { CategoryPlayerTeamRepository } from '../CategoryPlayerTeamRepository'

export class InMemoryCategoryPlayerTeamRepository
  implements CategoryPlayerTeamRepository
{
  public items: CategoryPlayerTeam[] = []
  async create(data: Prisma.CategoryPlayerTeamUncheckedCreateInput) {
    const categoryPlayerTeam = {
      id: 'id-1',
      category_id: data.category_id,
      player_id: data.player_id,
      team_id: data.team_id,
      avatar: data.avatar ? data.avatar : null,
      active: data.active ? data.active : true,
      deleted: false,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(categoryPlayerTeam)

    return categoryPlayerTeam
  }

  async findByCategoryIdTeamIdPlayerId(
    categoryId: string,
    playerId: string,
    teamId: string,
  ) {
    const categoryPlayerTeam = this.items.find(
      (item) =>
        item.category_id === categoryId &&
        item.player_id === playerId &&
        item.team_id === teamId,
    )

    if (!categoryPlayerTeam) {
      return null
    }

    return categoryPlayerTeam
  }

  async findPlayerActiveAnotherTeamThisCategoryId(
    categoryId: string,
    playerId: string,
    teamId: string,
  ) {
    const playerAlreadyActiveForAnotherTeam = this.items.find(
      (item) =>
        item.player_id === playerId &&
        item.category_id === categoryId &&
        item.active === true &&
        item.team_id !== teamId,
    )

    if (!playerAlreadyActiveForAnotherTeam) {
      return null
    }

    return playerAlreadyActiveForAnotherTeam
  }
}
