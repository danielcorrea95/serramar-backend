import { MakeListTeamsToContextByUserIdUseCase } from '@/UseCases/factories/teams/MakeListTeamsToContextByUserIdUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function ListTeamsToContextByUserIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userIdParamSchema = z.object({
    userId: z.string(),
  })

  const { userId } = userIdParamSchema.parse(request.params)

  const listTeamsToContextByUserIdUseCase =
    MakeListTeamsToContextByUserIdUseCase()

  const teams = await listTeamsToContextByUserIdUseCase.execute(userId)

  return reply.status(200).send(teams)
}
