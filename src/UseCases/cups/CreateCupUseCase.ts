import { CupsRepository } from '@/repositories/CupsRepository'
import { Cup } from '@prisma/client'
import { SubDomainAlreadyExistsError } from '../errors/SubDomainAlreadyExistsError'

interface CreateCupUseCaseRequest {
  companyId: string
  name: string
  subDomain: string
}

interface CreateCupUseCaseResponse {
  cup: Cup
}

export class CreateCupUseCase {
  constructor(private cupRepository: CupsRepository) {}

  async execute({
    companyId,
    name,
    subDomain,
  }: CreateCupUseCaseRequest): Promise<CreateCupUseCaseResponse> {
    const subDomainAlreadyExists = await this.cupRepository.findBySubDomain(
      subDomain,
    )

    if (subDomainAlreadyExists) {
      throw new SubDomainAlreadyExistsError()
    }

    const cup = await this.cupRepository.create({
      company_id: companyId,
      name,
      sub_domain: subDomain,
    })

    return { cup }
  }
}
