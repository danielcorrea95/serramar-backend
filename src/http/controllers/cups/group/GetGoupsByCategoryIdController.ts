import { MakeGetGroupsByCategoryIdUseCase } from '@/UseCases/factories/cups/group/MakeGetGroupsByCategoryIdUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function GetGroupsByCategoryIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const categoryIdParamSchema = z.object({
    categoryId: z.string(),
  })

  const { categoryId } = categoryIdParamSchema.parse(request.params)

  const getGroupsByCategoryIdUseCase = MakeGetGroupsByCategoryIdUseCase()

  const groups = await getGroupsByCategoryIdUseCase.execute(categoryId)

  return reply.status(200).send(groups)
}
