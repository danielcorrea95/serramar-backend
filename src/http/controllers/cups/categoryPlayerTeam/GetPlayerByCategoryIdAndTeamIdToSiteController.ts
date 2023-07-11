import { MakeGetPlayerByCategoryIdAndTeamIdToSiteUseCase } from '@/UseCases/factories/cups/categoryPlayerTeam/MakeGetPlayerByCategoryIdAndTeamIdToSiteUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function GetPlayerByCategoryIdAndTeamIdToSiteController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    categoryId: z.string(),
    teamId: z.string(),
  })

  const { categoryId, teamId } = paramsSchema.parse(request.params)

  const getPlayerByCategoryIdAndTeamIdToSiteUseCase =
    MakeGetPlayerByCategoryIdAndTeamIdToSiteUseCase()

  const players = await getPlayerByCategoryIdAndTeamIdToSiteUseCase.execute(
    categoryId,
    teamId,
  )

  return reply.status(200).send(players)
}
