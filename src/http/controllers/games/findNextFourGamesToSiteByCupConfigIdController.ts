import { MakeFindNextFourGamesToSiteByCupConfigIdUseCase } from '@/UseCases/factories/games/MakeFindNextFourGamesToSiteByCupConfigIdUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function FindNextFourGamesToSiteByCupConfigIdController(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const cupConfigId = '98ce87e1-e285-494c-8e3a-95a467302cf6'
  const findNextFourGamesToSiteByCupConfigIdUseCase =
    MakeFindNextFourGamesToSiteByCupConfigIdUseCase()

  const nextFourGames =
    await findNextFourGamesToSiteByCupConfigIdUseCase.execute(cupConfigId)

  return reply.status(200).send(nextFourGames)
}
