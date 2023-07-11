import { ResourceNotFoundError } from '@/UseCases/errors/ResourceNotFoundError'
import { MakeUploadImagePlayerUseCase } from '@/UseCases/factories/cups/categoryPlayerTeam/MakeUploadImagePlayerUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function UploadImagePlayerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const uploadImageParseSchema = z.object({
    linkId: z.string(),
  })

  const { linkId } = uploadImageParseSchema.parse(request.params)

  const { filename } = request.file

  try {
    const uploadImagePlayerUseCase = MakeUploadImagePlayerUseCase()

    await uploadImagePlayerUseCase.execute({ linkId, filename })

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
