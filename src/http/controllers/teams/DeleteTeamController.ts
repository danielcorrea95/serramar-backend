import { ResourceNotFoundError } from '@/UseCases/errors/ResourceNotFoundError'
import { MakeDeleteTeamUseCase } from '@/UseCases/factories/MakeDeleteTeamUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function DeleteTeamController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const teamIdParamSchema = z.object({
    teamId: z.string(),
  })

  const { teamId } = teamIdParamSchema.parse(request.params)

  try {
    const deleteTeamUseCase = MakeDeleteTeamUseCase()

    await deleteTeamUseCase.execute(teamId)

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
