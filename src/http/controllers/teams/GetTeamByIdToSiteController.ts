import { MakeGetTeamByIdToSiteUseCase } from '@/UseCases/factories/teams/MakeGetTeamByIdToSiteUseCase'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function GetTeamByIdToSiteController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    teamId: z.string(),
  })

  const { teamId } = paramsSchema.parse(request.params)

  const getTeamByIdToSiteUseCase = MakeGetTeamByIdToSiteUseCase()

  const team = await getTeamByIdToSiteUseCase.execute(teamId)
  return reply.status(200).send(team)
}
