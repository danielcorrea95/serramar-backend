import { MakeFindNextFourGamesToSiteByCupConfigIdUseCase } from '@/UseCases/factories/games/MakeFindNextFourGamesToSiteByCupConfigIdUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function FindNextFourGamesToSiteByCupConfigIdController(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const cupConfigId = 'fd1ce94d-4cf8-483d-ac63-5b35bc8a9ae9'
  const findNextFourGamesToSiteByCupConfigIdUseCase =
    MakeFindNextFourGamesToSiteByCupConfigIdUseCase()

  const nextFourGames =
    await findNextFourGamesToSiteByCupConfigIdUseCase.execute(cupConfigId)

  return reply.status(200).send(nextFourGames)
}
