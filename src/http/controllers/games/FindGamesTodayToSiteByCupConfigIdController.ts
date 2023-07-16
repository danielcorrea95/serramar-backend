import { MakeFindGamesTodayToSiteByCupConfigIdUseCase } from '@/UseCases/factories/games/MakeFindGamesTodayToSiteByCupConfigIdUseCase'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function FindGamesTodayToSiteByCupConfigIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const cupConfigId = 'fd1ce94d-4cf8-483d-ac63-5b35bc8a9ae9'

  const findGamesTodayByCupConfigIdUseCase =
    MakeFindGamesTodayToSiteByCupConfigIdUseCase()

  const findGamesTodayByCupConfigId =
    await findGamesTodayByCupConfigIdUseCase.execute(cupConfigId)

  return reply.status(200).send(findGamesTodayByCupConfigId)
}
