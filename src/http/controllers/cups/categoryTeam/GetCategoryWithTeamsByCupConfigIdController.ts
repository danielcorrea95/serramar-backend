import { MakeGetCategoryWithTeamsToSiteByCupConfigIdUseCase } from '@/UseCases/factories/cups/categoryTeam/MakeGetCategoryWithTeamsToSiteByCupConfigIdUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function GetCategoryWithTeamsToSiteByCupConfigIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const cupConfigId = '98ce87e1-e285-494c-8e3a-95a467302cf6'

  const getCategoryWithTeamsToSiteByCupConfigIdUseCase =
    MakeGetCategoryWithTeamsToSiteByCupConfigIdUseCase()

  const getCategoryWithTeams =
    await getCategoryWithTeamsToSiteByCupConfigIdUseCase.execute(cupConfigId)

  return reply.status(200).send(getCategoryWithTeams)
}
