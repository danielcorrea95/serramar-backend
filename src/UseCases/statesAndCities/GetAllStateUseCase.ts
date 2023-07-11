import { StatesRepository } from '@/repositories/StatesRepository'

interface StateResponse {
  id: number
  name: string
  uf: string
}

export class GetAllStateUseCase {
  constructor(private statesRepository: StatesRepository) {}

  async execute(): Promise<StateResponse[]> {
    const states = await this.statesRepository.findAll()

    return states.map((state) => ({
      id: state.id,
      name: state.name,
      uf: state.uf,
    }))
  }
}
