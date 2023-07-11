import { MakeCreateCategoryTeamUseCase } from '@/UseCases/factories/cups/categoryTeam/MakeCreateCategoryTeamUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function CreateCategoryTeamController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const categoryIdParamsSchema = z.object({
    categoryId: z.string(),
  })

  const createCategoryTeamBodySchema = z.object({
    teamId: z.string(),
  })

  const { categoryId } = categoryIdParamsSchema.parse(request.params)
  const { teamId } = createCategoryTeamBodySchema.parse(request.body)

  console.log(teamId)

  const createCategoryTeamUseCase = MakeCreateCategoryTeamUseCase()

  await createCategoryTeamUseCase.execute({ categoryId, teamId })

  return reply.status(201).send()
}
