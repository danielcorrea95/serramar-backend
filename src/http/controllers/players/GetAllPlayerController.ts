import { MakeGetAllPlayerUseCase } from '@/UseCases/factories/MakeGetAllPlayerUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function GetAllPlayerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const pageBodySchema = z.object({
    page: z.string().default('1'),
  })

  const { page } = pageBodySchema.parse(request.params)

  const pageNumber = Number(page)

  const getAllPlayerUseCase = MakeGetAllPlayerUseCase()

  const players = await getAllPlayerUseCase.execute(pageNumber)

  return reply.status(200).send(players)
}
