import { TeamAlreadHasTechnicalCommitteeError } from '@/UseCases/errors/TeamAlreadHasTechnicalCommitteeError'
import { TechnicalCommitteeAlreadyExistsError } from '@/UseCases/errors/TechnicalCommitteeAlreadyExistsError'
import { MakeLinkCategoryTeamTechnicalCommitteeUseCase } from '@/UseCases/factories/cups/categoryTeamTechnicalCommittee/MakeLinkCategoryTeamTechnicalCommitteeUseCase'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function LinkCategoryTeamTechnicalCommitteeController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const LinkCategoryTeamTechnicalCommitteeBodySchema = z.object({
    categoryId: z.string(),
    teamId: z.string(),
    technicalCommitteeId: z.string(),
    technicalCommitteeTypeId: z.string(),
  })

  const { categoryId, teamId, technicalCommitteeId, technicalCommitteeTypeId } =
    LinkCategoryTeamTechnicalCommitteeBodySchema.parse(request.body)

  try {
    const linkCategoryTeamTechnicalCommitteeUseCase =
      MakeLinkCategoryTeamTechnicalCommitteeUseCase()

    const linkCategoryTeamTechnicalCommittee =
      await linkCategoryTeamTechnicalCommitteeUseCase.execute({
        categoryId,
        teamId,
        technicalCommitteeId,
        technicalCommitteeTypeId,
      })

    return reply.status(201).send(linkCategoryTeamTechnicalCommittee)
  } catch (error) {
    if (error instanceof TechnicalCommitteeAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    if (error instanceof TeamAlreadHasTechnicalCommitteeError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
