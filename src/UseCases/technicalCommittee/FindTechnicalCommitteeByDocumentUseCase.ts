import { TechnicalCommitteeRepository } from '@/repositories/TechnicalCommitteeRepository'

export class FindTechnicalCommitteeByDocumentUseCase {
  constructor(
    private technicalCommitteeRepository: TechnicalCommitteeRepository,
  ) {}

  async execute(document: string) {
    const newDocument = document.replace(/[^0-9]/g, '')
    const technicalCommittee =
      await this.technicalCommitteeRepository.findByDocument(newDocument)

    return technicalCommittee
  }
}
