import { ResourceNotFoundError } from '@/UseCases/errors/ResourceNotFoundError'
import { MakeUploadImageTechnicalCommitteeUseCase } from '@/UseCases/factories/cups/categoryTeamTechnicalCommittee/MakeUploadImageTechnicalCommitteeUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function UploadImageTechnicalCommitteeController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const uploadImageParseSchema = z.object({
    linkId: z.string(),
  })

  const { linkId } = uploadImageParseSchema.parse(request.params)

  const { filename } = request.file

  try {
    const uploadImageTechnicalCommitteeUseCase =
      MakeUploadImageTechnicalCommitteeUseCase()

    await uploadImageTechnicalCommitteeUseCase.execute({ linkId, filename })

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
