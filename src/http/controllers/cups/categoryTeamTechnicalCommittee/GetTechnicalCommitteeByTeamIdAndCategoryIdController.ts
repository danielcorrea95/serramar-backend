import { MakeGetTechnicalCommitteeByTeamIdAndCategoryIdUseCase } from '@/UseCases/factories/cups/categoryTeamTechnicalCommittee/MakeGetTechnicalCommitteeByTeamIdAndCategoryIdUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function GetTechnicalCommitteeByTeamIdAndCategoryIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    teamId: z.string(),
    categoryId: z.string(),
  })

  const { teamId, categoryId } = paramsSchema.parse(request.params)

  const getTechnicalCommitteeByTeamIdAndCategoryIdUseCase =
    MakeGetTechnicalCommitteeByTeamIdAndCategoryIdUseCase()

  const technicalCommittee =
    await getTechnicalCommitteeByTeamIdAndCategoryIdUseCase.execute(
      teamId,
      categoryId,
    )

  return reply.status(200).send(technicalCommittee)
}
