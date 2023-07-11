import { MakeFindPlayerByDocumentUseCase } from '@/UseCases/factories/MakeFindPlayerByDocumentUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function FindPlayerByDocumentController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const documentParamSchema = z.object({
    document: z.string(),
  })

  const { document } = documentParamSchema.parse(request.params)

  const findPlayerByDocumentUseCase = MakeFindPlayerByDocumentUseCase()

  const player = await findPlayerByDocumentUseCase.execute({ document })

  return reply.status(200).send(player)
}
