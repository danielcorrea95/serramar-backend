import { ResourceNotFoundError } from '@/UseCases/errors/ResourceNotFoundError'
import { MakeUpdatePlayerUseCase } from '@/UseCases/factories/MakeUpdatePlayerUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function UpdatePlayerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const playerIdParamSchema = z.object({
    playerId: z.string(),
  })

  const updatePlayerBodySchema = z.object({
    name: z.string(),
    nickname: z.string().optional(),
    birthDate: z.string(),
    document: z.string(),
    phone: z.string(),
  })

  const { playerId } = playerIdParamSchema.parse(request.params)
  const { name, nickname, birthDate, document, phone } =
    updatePlayerBodySchema.parse(request.body)

  const dateBirth = new Date(birthDate)
  try {
    const updatePlayerUseCase = MakeUpdatePlayerUseCase()

    const player = await updatePlayerUseCase.execute({
      id: playerId,
      name,
      nickname,
      document,
      phone,
      dateBirth,
    })

    return reply.status(200).send(player)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
