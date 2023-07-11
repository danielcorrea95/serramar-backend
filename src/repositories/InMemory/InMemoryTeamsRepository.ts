import { Prisma, Team } from '@prisma/client'
import { TeamsRepository } from '../TeamsRepository'

export class InMemoryTeamsRepository implements TeamsRepository {
  public items: Team[] = []

  async create(data: Prisma.TeamUncheckedCreateInput) {
    const team = {
      id: 'team-1',
      name: data.name,
      responsible: data.responsible,
      phone: data.phone ? data.phone : null,
      email: data.email ? data.email : null,
      foundation_date: data.foundation_date
        ? new Date(data.foundation_date)
        : null,
      image: data.image ? data.image : null,
      city_id: data.city_id,
      deleted: false,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(team)

    return team
  }
}
