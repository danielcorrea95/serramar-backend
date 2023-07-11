import { MakeGetPlayerByCategoryIdAndTeamIdUseCase } from '@/UseCases/factories/cups/categoryPlayerTeam/MakeGetPlayerByCategoryIdAndTeamIdUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function GetPlayerByCategoryIdAndTeamIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getParamsSchema = z.object({
    categoryId: z.string(),
    teamId: z.string(),
  })

  const { categoryId, teamId } = getParamsSchema.parse(request.params)

  const getPlayerByCategoryIdAndTeamIdUseCase =
    MakeGetPlayerByCategoryIdAndTeamIdUseCase()

  const players = await getPlayerByCategoryIdAndTeamIdUseCase.execute({
    categoryId,
    teamId,
  })

  return reply.status(200).send(players)
}
