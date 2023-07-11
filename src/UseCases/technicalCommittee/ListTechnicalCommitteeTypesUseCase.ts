import { TechnicalCommitteeTypesRepository } from '@/repositories/TechnicalCommitteeTypesRepository'

export class ListTechnicalCommitteeTypesUseCase {
  constructor(
    private technicalCommitteetypesRepository: TechnicalCommitteeTypesRepository,
  ) {}

  async execute() {
    const types = await this.technicalCommitteetypesRepository.listAll()

    return types
  }
}
