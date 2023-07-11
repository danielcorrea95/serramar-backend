import { MakeListTechnicalCommitteeTypesUseCase } from '@/UseCases/factories/technicalCommittee/MakeListTechnicalCommitteeTypesUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function ListTechnicalCommitteeTypesController(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const listTechnicalCommitteeTypesUseCase =
    MakeListTechnicalCommitteeTypesUseCase()

  const listAll = await listTechnicalCommitteeTypesUseCase.execute()

  return reply.status(200).send(listAll)
}
