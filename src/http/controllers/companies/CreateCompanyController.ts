import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { CnpjAlreadyExistsError } from '@/UseCases/errors/CnpjAlreadyExistsError'
import { MakeCreateCompanyUseCase } from '@/UseCases/factories/companies/MakeCreateCompanyUseCase'
import { EmailAlreadyExistsError } from '@/UseCases/errors/EmailAlreadyExistsError'

export async function CreateCompanyController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCompanyBodySchema = z.object({
    name: z.string(),
    cnpj: z.string(),
    phone: z.string(),
    email: z.string(),
    address: z.string(),
    cityId: z.number(),
    stateId: z.number(),
  })

  const { name, cnpj, phone, email, address, cityId, stateId } =
    createCompanyBodySchema.parse(request.body)

  try {
    const createCompanyUseCase = MakeCreateCompanyUseCase()

    const { company } = await createCompanyUseCase.execute({
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
    if (error instanceof CnpjAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    if (error instanceof EmailAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
