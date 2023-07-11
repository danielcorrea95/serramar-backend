import { ResourceNotFoundError } from '@/UseCases/errors/ResourceNotFoundError'
import { MakeGetCompanyByIdUseCase } from '@/UseCases/factories/MakeGetCompanyByIdUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function GetCompanyByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const companyIdParamSchema = z.object({
    companyId: z.string(),
  })

  const { companyId } = companyIdParamSchema.parse(request.params)

  console.log(companyId)

  try {
    const getCompanyByIdUseCase = MakeGetCompanyByIdUseCase()

    const company = await getCompanyByIdUseCase.execute(companyId)

    return reply.status(200).send(company)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
