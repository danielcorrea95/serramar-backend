import { MakeFindTechnicalCommitteeByDocumentUseCase } from '@/UseCases/factories/technicalCommittee/MakeFindTechnicalCommitteeByDocumentUseCase'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function FindTechnicalCommitteeByDocumentController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const documentSchema = z.object({
    document: z.string(),
  })

  const { document } = documentSchema.parse(request.params)

  const findTechnicalCommitteeByDocumentUseCase =
    MakeFindTechnicalCommitteeByDocumentUseCase()

  const findTechnicalCommittee =
    await findTechnicalCommitteeByDocumentUseCase.execute(document)

  return reply.status(200).send(findTechnicalCommittee)
}
