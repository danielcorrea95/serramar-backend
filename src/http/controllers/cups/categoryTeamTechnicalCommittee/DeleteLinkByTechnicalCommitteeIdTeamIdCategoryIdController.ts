import { ResourceNotFoundError } from '@/UseCases/errors/ResourceNotFoundError'
import { MakeDeleteLinkByTechnicalCommitteeIdTeamIdCategoryIdUseCase } from '@/UseCases/factories/cups/categoryTeamTechnicalCommittee/MakeDeleteLinkByTechnicalCommitteeIdTeamIdCategoryIdUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function DeleteLinkByTechnicalCommitteeIdTeamIdCategoryIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    technicalCommitteeId: z.string(),
    teamId: z.string(),
    categoryId: z.string(),
  })

  const { teamId, categoryId, technicalCommitteeId } = bodySchema.parse(
    request.params,
  )

  try {
    const deleteLinkByTechnicalCommitteeIdTeamIdCategoryIdUseCase =
      MakeDeleteLinkByTechnicalCommitteeIdTeamIdCategoryIdUseCase()

    await deleteLinkByTechnicalCommitteeIdTeamIdCategoryIdUseCase.execute({
      categoryId,
      technicalCommitteeId,
      teamId,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
