import { MakeDeletePlayerUseCase } from '@/UseCases/factories/MakeDeletePlayerUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function DeletePlayerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const playerIdParamSchema = z.object({
    playerId: z.string(),
  })

  const { playerId } = playerIdParamSchema.parse(request.params)

  const deletePlayerUseCase = MakeDeletePlayerUseCase()

  await deletePlayerUseCase.execute(playerId)

  return reply.status(200).send()
}
