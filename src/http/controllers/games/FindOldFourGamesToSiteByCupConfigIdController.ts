import { MakeFindOldFourGamesToSiteByCupConfigIdUseCase } from '@/UseCases/factories/games/MakeFindOldFourGamesToSiteByCupConfigIdUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function FindOldFourGamesToSiteByCupConfigIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const cupConfigId = '98ce87e1-e285-494c-8e3a-95a467302cf6'

  const findOldFourGamesToSiteByCupConfigIdUseCase =
    MakeFindOldFourGamesToSiteByCupConfigIdUseCase()

  const findOldGames = await findOldFourGamesToSiteByCupConfigIdUseCase.execute(
    cupConfigId,
  )

  return reply.status(200).send(findOldGames)
}
