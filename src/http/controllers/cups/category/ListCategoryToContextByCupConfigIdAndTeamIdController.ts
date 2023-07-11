import { MakeListCategoryToContextByCupConfigIdAndTeamIdUseCase } from '@/UseCases/factories/cups/category/MakeListCategoryToContextByCupConfigIdAndTeamIdUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function ListCategoryToContextByCupConfigIdAndTeamIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    cupConfigId: z.string(),
    teamId: z.string(),
  })

  const { cupConfigId, teamId } = bodySchema.parse(request.params)

  const listCategoryToContextByCupIdAndTeamIdUseCase =
    MakeListCategoryToContextByCupConfigIdAndTeamIdUseCase()

  const categories = await listCategoryToContextByCupIdAndTeamIdUseCase.execute(
    {
      cupConfigId,
      teamId,
    },
  )

  return reply.status(200).send(categories)
}
