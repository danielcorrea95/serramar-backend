import { ResourceNotFoundError } from '@/UseCases/errors/ResourceNotFoundError'
import { MakeUpdateContextUserUseCase } from '@/UseCases/factories/users/MakeUpdateContextUserUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function UpdateContextUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userIdParamSchema = z.object({
    userId: z.string(),
  })

  const updateContextBodySchema = z.object({
    teamId: z.string().nullable(),
    cupConfigId: z.string().nullable(),
    categoryId: z.string().nullable(),
  })

  const { userId } = userIdParamSchema.parse(request.params)
  const { teamId, cupConfigId, categoryId } = updateContextBodySchema.parse(
    request.body,
  )

  try {
    const updateContextUserUseCase = MakeUpdateContextUserUseCase()

    const updateContext = await updateContextUserUseCase.execute({
      userId,
      teamId,
      cupConfigId,
      categoryId,
    })

    return reply.status(200).send(updateContext)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
