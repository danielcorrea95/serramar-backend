import { MakeGetAllCompanyUseCase } from '@/UseCases/factories/MakeGetAllCompanyUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export default async function GetAllCompanyController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const pageBodySchema = z.object({
    page: z.string().default('1'),
  })

  const { page } = pageBodySchema.parse(request.params)

  const pageNumber = Number(page)

  const getAllCompanyUseCase = MakeGetAllCompanyUseCase()

  const companies = await getAllCompanyUseCase.execute(pageNumber)

  return reply.status(200).send(companies)
}
