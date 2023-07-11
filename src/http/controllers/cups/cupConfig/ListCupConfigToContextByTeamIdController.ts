import { MakeListCupConfigToContextByTeamIdUseCase } from '@/UseCases/factories/cups/cupConfig/MakeListCupConfigToContextByTeamIdUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function ListCupConfigToContextByTeamIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const teamIdParamsSchema = z.object({
    teamId: z.string(),
  })

  const { teamId } = teamIdParamsSchema.parse(request.params)

  const listCupConfigByTeamIdUseCase =
    MakeListCupConfigToContextByTeamIdUseCase()

  const cups = await listCupConfigByTeamIdUseCase.execute(teamId)

  return reply.status(200).send(cups)
}
