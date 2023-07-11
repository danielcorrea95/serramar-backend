import { ResourceNotFoundError } from '@/UseCases/errors/ResourceNotFoundError'
import { MakeUpdateTeamUseCase } from '@/UseCases/factories/MakeUpdateTeamUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function UpdateTeamController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const teamIdParamSchema = z.object({
    teamId: z.string(),
  })

  const updateTeamBodySchema = z.object({
    name: z.string(),
    responsible: z.string(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    fundation: z.string(),
    cityId: z.number(),
  })

  const { teamId } = teamIdParamSchema.parse(request.params)

  const { name, responsible, phone, email, fundation, cityId } =
    updateTeamBodySchema.parse(request.body)

  const fundationDate = new Date(fundation)

  try {
    const updateTeamUseCase = MakeUpdateTeamUseCase()

    const updateTeam = await updateTeamUseCase.execute({
      id: teamId,
      name,
      responsible,
      phone,
      email,
      fundationDate,
      cityId,
    })

    return reply.status(200).send(updateTeam)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
