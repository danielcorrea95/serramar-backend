import { MakeCreateCategoryUseCase } from '@/UseCases/factories/cups/category/MakeCreateCategoryUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function CreateCategoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCategoryBodySchema = z.object({
    cupConfigId: z.string(),
    name: z.string(),
    amountGroup: z.number(),
    amountNextPhase: z.number(),
    amountTeams: z.number(),
  })

  const { cupConfigId, name, amountGroup, amountNextPhase, amountTeams } =
    createCategoryBodySchema.parse(request.body)

  const createCategoryUseCase = MakeCreateCategoryUseCase()

  await createCategoryUseCase.execute({
    cupConfigId,
    name,
    amountGroup,
    amountNextPhase,
    amountTeams,
  })

  reply.code(201).send()
}
