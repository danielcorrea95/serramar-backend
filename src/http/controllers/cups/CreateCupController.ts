import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { SubDomainAlreadyExistsError } from '@/UseCases/errors/SubDomainAlreadyExistsError'
import { MakeCreateCupUseCase } from '@/UseCases/factories/cups/MakeCreateCupUseCase'

export async function CreateCupController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCupBpdySchema = z.object({
    companyId: z.string(),
    name: z.string(),
    subDomain: z.string(),
  })

  const { companyId, name, subDomain } = createCupBpdySchema.parse(request.body)

  const createCupUseCase = MakeCreateCupUseCase()

  try {
    const { cup } = await createCupUseCase.execute({
      companyId,
      name,
      subDomain,
    })

    return reply.status(201).send(cup)
  } catch (error) {
    if (error instanceof SubDomainAlreadyExistsError) {
      return reply.code(409).send({
        message: error.message,
      })
    }

    throw error
  }
}
