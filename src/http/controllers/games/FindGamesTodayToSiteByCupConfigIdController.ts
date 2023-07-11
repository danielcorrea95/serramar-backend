import { MakeFindGamesTodayToSiteByCupConfigIdUseCase } from '@/UseCases/factories/games/MakeFindGamesTodayToSiteByCupConfigIdUseCase'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function FindGamesTodayToSiteByCupConfigIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const cupConfigId = '98ce87e1-e285-494c-8e3a-95a467302cf6'

  const findGamesTodayByCupConfigIdUseCase =
    MakeFindGamesTodayToSiteByCupConfigIdUseCase()

  const findGamesTodayByCupConfigId =
    await findGamesTodayByCupConfigIdUseCase.execute(cupConfigId)

  return reply.status(200).send(findGamesTodayByCupConfigId)
}
