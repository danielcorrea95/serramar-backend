import { ResourceNotFoundError } from '@/UseCases/errors/ResourceNotFoundError'
import { MakeGetPlayerByIdUseCase } from '@/UseCases/factories/MakeGetPlayerByIdUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function GetPlayerByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const playerIdParamSchema = z.object({
    playerId: z.string(),
  })

  const { playerId } = playerIdParamSchema.parse(request.params)

  try {
    const getPlayerByIdUseCase = MakeGetPlayerByIdUseCase()

    const player = await getPlayerByIdUseCase.execute(playerId)

    return reply.status(200).send(player)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
