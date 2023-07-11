import { ResourceNotFoundError } from '@/UseCases/errors/ResourceNotFoundError'
import { MakeUpdateCompanyUseCase } from '@/UseCases/factories/MakeUpdateCompanyUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function UpdateCompanyController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const companyIdParamSchema = z.object({
    companyId: z.string(),
  })
  const updateCompanyBodySchema = z.object({
    name: z.string(),
    cnpj: z.string(),
    phone: z.string(),
    email: z.string(),
    address: z.string(),
    cityId: z.number(),
    stateId: z.number(),
  })

  const { companyId } = companyIdParamSchema.parse(request.params)
  const { name, cnpj, phone, email, address, cityId, stateId } =
    updateCompanyBodySchema.parse(request.body)

  try {
    const updateCompanyUseCase = MakeUpdateCompanyUseCase()
    const company = await updateCompanyUseCase.execute({
      id: companyId,
      name,
      cnpj,
      phone,
      email,
      address,
      cityId,
      stateId,
    })

    return reply.status(201).send(company)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
