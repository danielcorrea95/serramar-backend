import { MakeFindGamesByCupConfigIdUseCase } from '@/UseCases/factories/games/MakeFindGamesByCupConfigIdUseCase'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
export async function FindGamesByCupConfigIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const cupConfigIdParamSchema = z.object({
    cupConfigId: z.string(),
  })

  const { cupConfigId } = cupConfigIdParamSchema.parse(request.params)

  const findGamesByCupIdUseCase = MakeFindGamesByCupConfigIdUseCase()

  const findGames = await findGamesByCupIdUseCase.execute(cupConfigId)

  return reply.status(200).send(findGames)
}
