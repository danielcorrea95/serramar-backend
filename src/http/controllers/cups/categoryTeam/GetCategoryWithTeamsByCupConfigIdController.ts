import { MakeGetCategoryWithTeamsToSiteByCupConfigIdUseCase } from '@/UseCases/factories/cups/categoryTeam/MakeGetCategoryWithTeamsToSiteByCupConfigIdUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function GetCategoryWithTeamsToSiteByCupConfigIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const cupConfigId = 'fd1ce94d-4cf8-483d-ac63-5b35bc8a9ae9'

  const getCategoryWithTeamsToSiteByCupConfigIdUseCase =
    MakeGetCategoryWithTeamsToSiteByCupConfigIdUseCase()

  const getCategoryWithTeams =
    await getCategoryWithTeamsToSiteByCupConfigIdUseCase.execute(cupConfigId)

  return reply.status(200).send(getCategoryWithTeams)
}
