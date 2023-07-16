import { MakeFindAllGamesToSiteByCupConfigIdUseCase } from '@/UseCases/factories/games/MakeFindAllGamesToSiteByCupConfigIdUseCase'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function FindAllGamesToSiteByCupConfigIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const cupConfigId = 'fd1ce94d-4cf8-483d-ac63-5b35bc8a9ae9'

  const findAllGamesToSiteByCupConfigIdUseCase =
    MakeFindAllGamesToSiteByCupConfigIdUseCase()

  const allGames = await findAllGamesToSiteByCupConfigIdUseCase.execute(
    cupConfigId,
  )

  return reply.status(200).send(allGames)
}
