import { TechnicalCommitteeRepository } from '@/repositories/TechnicalCommitteeRepository'

interface TechnicalCommittee {
  name: string
  phone: string | null
  document: string
  attachment: string | null
}

export class CreateTechnicalCommitteeUseCase {
  constructor(
    private technicalCommitteeRepository: TechnicalCommitteeRepository,
  ) {}

  async execute({ name, document, phone, attachment }: TechnicalCommittee) {
    const technicalCommittee =
      await this.technicalCommitteeRepository.findByDocument(document)

    if (technicalCommittee) {
      return technicalCommittee
    }

    const creteTechnicalCommittee =
      await this.technicalCommitteeRepository.create({
        name,
        phone,
        document,
        attachment,
      })

    return creteTechnicalCommittee
  }
}
