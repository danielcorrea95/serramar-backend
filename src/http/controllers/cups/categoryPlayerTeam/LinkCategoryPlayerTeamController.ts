import { LinkAlreadyExistsError } from '@/UseCases/errors/LinkAlreadyExistsError'
import { PlayerAlreadyActiveForAnotherTeamError } from '@/UseCases/errors/playerAlreadyActiveForAnotherTeamError'
import { MakeLinkCategoryPlayerTeamUseCase } from '@/UseCases/factories/cups/categoryPlayerTeam/MakeLinkCategoryPlayerTeamUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function LinkCategoryPlayerTeamController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createLinkBodySchema = z.object({
    categoryId: z.string(),
    playerId: z.string(),
    teamId: z.string(),
    active: z.boolean().default(false),
  })

  const { categoryId, playerId, teamId, active } = createLinkBodySchema.parse(
    request.body,
  )

  try {
    const linkCategoryPlayerTeamUseCase = MakeLinkCategoryPlayerTeamUseCase()

    const linkPlayer = await linkCategoryPlayerTeamUseCase.execute({
      categoryId,
      playerId,
      teamId,
      active,
    })

    return reply.status(201).send(linkPlayer)
  } catch (error) {
    if (error instanceof LinkAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    if (error instanceof PlayerAlreadyActiveForAnotherTeamError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
