import { PlayerAlreadyExistsError } from '@/UseCases/errors/PlayerAlreadyExistsError'
import { makeCreatePlayerUseCase } from '@/UseCases/factories/players/MakeCreatePlayerUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function CreatePlayerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createPlayerBodySchema = z.object({
    name: z.string(),
    nickname: z.string().optional(),
    birthDate: z.string(),
    document: z.string(),
    phone: z.string(),
  })

  const { name, nickname, birthDate, document, phone } =
    createPlayerBodySchema.parse(request.body)

  try {
    const createPlayerUseCase = makeCreatePlayerUseCase()
    const dateBirth = new Date(birthDate)
    const { player } = await createPlayerUseCase.execute({
      name,
      nickname,
      dateBirth,
      document,
      phone,
    })
    return reply.status(201).send(player)
  } catch (error) {
    if (error instanceof PlayerAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
