import { ResourceNotFoundError } from '@/UseCases/errors/ResourceNotFoundError'
import { MakeGetTeamByIdUseCase } from '@/UseCases/factories/MakeGetTeamByIdUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function GetTeamByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const teamIdParamSchema = z.object({
    teamId: z.string(),
  })

  const { teamId } = teamIdParamSchema.parse(request.params)

  try {
    const getTeamByIdUseCase = MakeGetTeamByIdUseCase()

    const team = await getTeamByIdUseCase.execute(teamId)

    return reply.status(200).send(team)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
