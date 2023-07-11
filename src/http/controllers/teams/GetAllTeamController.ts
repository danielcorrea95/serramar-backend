import { MakeGetAllTeamUseCase } from '@/UseCases/factories/MakeGetAllTeamUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function GetAllTeamController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const pageBodySchema = z.object({
    page: z.string().default('1'),
  })

  const { page } = pageBodySchema.parse(request.params)

  const pageNumber = Number(page)

  const getAllTeamUseCase = MakeGetAllTeamUseCase()

  const teams = await getAllTeamUseCase.execute(pageNumber)

  return reply.status(200).send(teams)
}
