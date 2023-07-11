import { ResourceNotFoundError } from '@/UseCases/errors/ResourceNotFoundError'
import { MakeUpdateGameDetailsByIdUseCase } from '@/UseCases/factories/games/scoresheet/MakeUpdateGameDetailsByIdUseCase'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
export async function UpdateGameDetailsByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateGameDetailsBodySchema = z.object({
    gameId: z.string(),
    firstPeriodStart: z.string(),
    firstPeriodEnd: z.string(),
    secondPeriodStart: z.string(),
    secondPeriodEnd: z.string(),
    extraPeriodStart: z.string(),
    extraPeriodEnd: z.string(),
    observation: z.string(),
  })

  const gameDetailIdParamSchema = z.object({
    gameDetailId: z.string(),
  })

  const userId = request.user.sub

  const {
    gameId,
    firstPeriodStart,
    firstPeriodEnd,
    secondPeriodStart,
    secondPeriodEnd,
    extraPeriodStart,
    extraPeriodEnd,
    observation,
  } = updateGameDetailsBodySchema.parse(request.body)

  const { gameDetailId } = gameDetailIdParamSchema.parse(request.params)

  try {
    const updateGameDetailsByIdUseCase = MakeUpdateGameDetailsByIdUseCase()

    const updateGameDetail = await updateGameDetailsByIdUseCase.execute({
      id: gameDetailId,
      userId,
      gameId,
      firstPeriodStart,
      firstPeriodEnd,
      secondPeriodStart,
      secondPeriodEnd,
      extraPeriodStart,
      extraPeriodEnd,
      observation,
    })

    return reply.status(200).send(updateGameDetail)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
