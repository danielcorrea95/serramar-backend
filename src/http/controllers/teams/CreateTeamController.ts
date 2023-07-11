import { makeCreateTeamUseCase } from '@/UseCases/factories/teams/MakeCreateTeamUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function CreateTeamController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createTeamBodySchema = z.object({
    name: z.string(),
    code: z.string(),
    responsible: z.string(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    fundation: z.string(),
    cityId: z.number(),
  })

  const { name, code, responsible, phone, email, fundation, cityId } =
    createTeamBodySchema.parse(request.body)

  const fundationDate = new Date(fundation)

  const createTeamUseCase = makeCreateTeamUseCase()
  const team = await createTeamUseCase.execute({
    name,
    code,
    responsible,
    phone,
    email,
    fundationDate,
    cityId,
  })

  return reply.code(201).send(team)
}
