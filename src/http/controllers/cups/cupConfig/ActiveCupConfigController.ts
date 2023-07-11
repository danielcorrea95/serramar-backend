import { MakeActiveCupConfigUseCase } from '@/UseCases/factories/cups/cupConfig/MakeActiveCupConfigUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function ActiveCupConfigController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const activeCupConfigBodySchema = z.object({
    cupId: z.string(),
    cupConfigId: z.string(),
    active: z.boolean(),
  })

  const { cupId, cupConfigId, active } = activeCupConfigBodySchema.parse(
    request.body,
  )

  try {
    const activeCupConfigUseCase = MakeActiveCupConfigUseCase()

    await activeCupConfigUseCase.execute({
      cupId,
      cupConfigId,
      active,
    })
  } catch (error) {
    if (error instanceof Error) {
      reply.code(409).send(error.message)
    }

    throw error
  }

  return reply.status(201).send()
}
