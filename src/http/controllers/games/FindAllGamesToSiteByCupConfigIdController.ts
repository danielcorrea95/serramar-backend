import { MakeFindAllGamesToSiteByCupConfigIdUseCase } from '@/UseCases/factories/games/MakeFindAllGamesToSiteByCupConfigIdUseCase'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function FindAllGamesToSiteByCupConfigIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const cupConfigId = '98ce87e1-e285-494c-8e3a-95a467302cf6'

  const findAllGamesToSiteByCupConfigIdUseCase =
    MakeFindAllGamesToSiteByCupConfigIdUseCase()

  const allGames = await findAllGamesToSiteByCupConfigIdUseCase.execute(
    cupConfigId,
  )

  return reply.status(200).send(allGames)
}
