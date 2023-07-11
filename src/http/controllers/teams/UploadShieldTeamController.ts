import { ResourceNotFoundError } from '@/UseCases/errors/ResourceNotFoundError'
import { MakeUploadShieldTeamUseCase } from '@/UseCases/factories/teams/MakeUploadShieldTeamUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function UploadShieldTeamController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const uploadShieldSchema = z.object({
    teamId: z.string(),
  })

  const { teamId } = uploadShieldSchema.parse(request.params)
  const { filename } = request.file

  try {
    const uploadShieldTeamUseCase = MakeUploadShieldTeamUseCase()

    await uploadShieldTeamUseCase.execute({
      teamId,
      shieldFile: filename,
    })

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
