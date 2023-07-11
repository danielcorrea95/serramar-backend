import { CardTypeAlreadyExistsError } from '@/UseCases/errors/CardTypeAlreadyExistsError'
import { MakeCreateCardTypeUseCase } from '@/UseCases/factories/cups/cardType/MakeCreateCardTypeUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function CreateCardTypeController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCardTypesBodySchema = z.object({
    cupConfigId: z.string(),
    name: z.enum(['Amarelo', 'Vermelho']),
    points: z.number(),
  })

  const { cupConfigId, name, points } = createCardTypesBodySchema.parse(
    request.body,
  )

  try {
    const createCardTypesUseCase = MakeCreateCardTypeUseCase()

    await createCardTypesUseCase.execute({
      cupConfigId,
      name,
      points,
    })
  } catch (error) {
    if (error instanceof CardTypeAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
    throw error
  }

  reply.code(201).send()
}
