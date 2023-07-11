import { ResourceNotFoundError } from '@/UseCases/errors/ResourceNotFoundError'
import { MakeDeleteCompanyUseCase } from '@/UseCases/factories/MakeDeteleCompanyUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function DeleteCompanyController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const companyIdParamSchema = z.object({
    companyId: z.string(),
  })

  const { companyId } = companyIdParamSchema.parse(request.params)

  try {
    const deleteCompanyUseCase = MakeDeleteCompanyUseCase()

    await deleteCompanyUseCase.execute(companyId)

    reply.code(200).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
