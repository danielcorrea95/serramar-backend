import { MakeCreateCupConfigUseCase } from '@/UseCases/factories/cups/cardType/MakeCreateCupConfigUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function CreateCupConfigController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCupConfigBodySchema = z.object({
    cupId: z.string(),
    startDate: z.string(),
    name: z.string(),
    registrationDeadline: z.string(),
    endDate: z.string(),
    amountPlayers: z.number(),
    regulation: z.string(),
  })

  const {
    cupId,
    name,
    registrationDeadline,
    startDate,
    endDate,
    amountPlayers,
    regulation,
  } = createCupConfigBodySchema.parse(request.body)

  const createCupConfigUseCase = MakeCreateCupConfigUseCase()

  const newStartDate = new Date(startDate)
  const newEndDate = new Date(endDate)
  const newRegistrationDeadline = new Date(registrationDeadline)

  await createCupConfigUseCase.execute({
    cupId,
    name,
    registrationDeadline: newRegistrationDeadline,
    newStartDate,
    newEndDate,
    amountPlayers,
    regulation,
  })

  return reply.status(201).send()
}
