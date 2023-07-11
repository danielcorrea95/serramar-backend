import { MakeGetLinkIdByCategoryIdPlayerIdTeamIdUseCase } from '@/UseCases/factories/cups/categoryPlayerTeam/MakeGetLinkIdByCategoryIdPlayerIdTeamIdUseCase'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
export async function GetLinkIdByCategoryIdPlayerIdTeamIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramSchema = z.object({
    categoryId: z.string(),
    teamId: z.string(),
    playerId: z.string(),
  })

  const { categoryId, playerId, teamId } = paramSchema.parse(request.params)

  const getLinkIdByCategoryIdPlayerIdTeamIdUseCase =
    MakeGetLinkIdByCategoryIdPlayerIdTeamIdUseCase()

  const link = await getLinkIdByCategoryIdPlayerIdTeamIdUseCase.execute(
    categoryId,
    teamId,
    playerId,
  )

  return reply.status(200).send(link)
}
