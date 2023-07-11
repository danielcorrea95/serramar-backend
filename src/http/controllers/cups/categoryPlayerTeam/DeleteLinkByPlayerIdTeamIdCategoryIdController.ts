import { ResourceNotFoundError } from '@/UseCases/errors/ResourceNotFoundError'
import { MakeDeleteLinkByPlayerIdTeamIdCategoryIdUseCase } from '@/UseCases/factories/cups/categoryPlayerTeam/MakeDeleteLinkByPlayerIdTeamIdCategoryIdUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function DeleteLinkByPlayerIdTeamIdCategoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    playerId: z.string(),
    teamId: z.string(),
    categoryId: z.string(),
  })

  const { teamId, categoryId, playerId } = bodySchema.parse(request.params)

  try {
    const deletePlayerByLinkIdUseCase =
      MakeDeleteLinkByPlayerIdTeamIdCategoryIdUseCase()

    await deletePlayerByLinkIdUseCase.execute({
      categoryId,
      playerId,
      teamId,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
