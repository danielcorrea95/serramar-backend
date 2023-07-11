import { ResourceNotFoundError } from '@/UseCases/errors/ResourceNotFoundError'
import { MakeFindGameByIdAllDataUseCase } from '@/UseCases/factories/games/scoresheet/MakeFindGameByIdAllDataUseCase'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function FindGameByIdAllDataController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const gameIdParamSchema = z.object({
    gameId: z.string(),
  })

  const { gameId } = gameIdParamSchema.parse(request.params)

  try {
    const findGameByIdAllDataUseCase = MakeFindGameByIdAllDataUseCase()

    const game = await findGameByIdAllDataUseCase.execute(gameId)

    return reply.status(200).send(game)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
