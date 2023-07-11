import { MakeCreatePlayerNumberByGameIdUseCase } from '@/UseCases/factories/games/scoresheet/MakeCreatePlayerNumberByGameIdUseCase'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function CreatePlayerNumberByGameIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const playerNumberBodySchema = z.object({
    playerNumber: z
      .object({
        playerId: z.string(),
        number: z.number(),
      })
      .array(),
  })

  const gameIdParamSchema = z.object({
    gameId: z.string(),
  })

  const { playerNumber } = playerNumberBodySchema.parse(request.body)
  const { gameId } = gameIdParamSchema.parse(request.params)

  const createPlayerNumberByGameIdUseCase =
    MakeCreatePlayerNumberByGameIdUseCase()

  const data = {
    gameId,
    player: playerNumber,
  }

  await createPlayerNumberByGameIdUseCase.execute(data)

  return reply.status(201).send()
}
