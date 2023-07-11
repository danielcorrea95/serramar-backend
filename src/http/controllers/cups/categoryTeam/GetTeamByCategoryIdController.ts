import { MakeGetTeamByCategoryIdUseCase } from '@/UseCases/factories/cups/categoryTeam/MakeGetTeamByCategoryIdUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function GetTeamByCategoryIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const categoryIdParamSchema = z.object({
    categoryId: z.string(),
  })

  const { categoryId } = categoryIdParamSchema.parse(request.params)

  const getTeamByCategoryIdUseCase = MakeGetTeamByCategoryIdUseCase()

  const teams = await getTeamByCategoryIdUseCase.execute(categoryId)

  return reply.status(200).send(teams)
}
