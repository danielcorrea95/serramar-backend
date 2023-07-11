import { TeamUserRepository } from '@/repositories/TeamUserRepository'
import { TeamsRepository } from '@/repositories/TeamsRepository'
import { UsersRepository } from '@/repositories/UsersRepository'
import { Team } from '@prisma/client'

interface CreateTeamUseCaseRequest {
  name: string
  code: string
  responsible: string
  phone?: string
  email?: string
  fundationDate: Date
  cityId: number
}

interface CreateTeamUseCaseResponse {
  team: Team
}

export class CreateTeamUseCase {
  constructor(
    private teamsRepository: TeamsRepository,
    private teamUsersRepository: TeamUserRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    name,
    responsible,
    phone,
    email,
    fundationDate,
    cityId,
    code,
  }: CreateTeamUseCaseRequest): Promise<CreateTeamUseCaseResponse> {
    const phoneNumber = phone?.replace(/[^0-9]/g, '')

    const team = await this.teamsRepository.create({
      name,
      code,
      responsible,
      phone: phoneNumber,
      email,
      foundation_date: fundationDate,
      city_id: cityId,
    })

    // consulta usuarios admin
    const usersOfRoleAdmin = await this.usersRepository.findByRoleName('admin')

    usersOfRoleAdmin.map(async (item) => {
      // adiciona equipe para todos os administradores
      await this.teamUsersRepository.create(item.id, team.id)
    })

    return { team }
  }
}
