import { MakeListCategoryByCupConfigIdUseCase } from '@/UseCases/factories/cups/category/MakeListCategoryByCupConfigIdUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function ListCategoryByCupConfigIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const cupConfigIdBodySchema = z.object({
    cupConfigId: z.string(),
  })

  const { cupConfigId } = cupConfigIdBodySchema.parse(request.params)

  const listCategoryByCupConfigIdUseCase =
    MakeListCategoryByCupConfigIdUseCase()

  const categories = await listCategoryByCupConfigIdUseCase.execute(cupConfigId)

  return reply.status(200).send(categories)
}
