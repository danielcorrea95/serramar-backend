import { MakeCreateGameDetailsUseCase } from '@/UseCases/factories/games/scoresheet/MakeCreateGameDetailsUseCase'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function CreateGameDetailsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const gameIdParamSchema = z.object({
    gameId: z.string(),
  })

  const { gameId } = gameIdParamSchema.parse(request.params)
  const userId = request.user.sub

  const createGameDetailsUseCase = MakeCreateGameDetailsUseCase()

  const gameDetails = await createGameDetailsUseCase.execute({ gameId, userId })

  return reply.status(201).send(gameDetails)
}
