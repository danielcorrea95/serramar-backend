import { InvalidCredentialsError } from '@/UseCases/errors/InvalidCredentialsError'
import { MakeAuthenticateUseCase } from '@/UseCases/factories/MakeAuthenticateUseCase'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function AuthenticateController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    username: z.string(),
    password: z.string().min(6),
  })

  const { username, password } = registerBodySchema.parse(request.body)

  try {
    const authenticateUseCase = MakeAuthenticateUseCase()
    const token = await authenticateUseCase.execute({
      username,
      password,
    })

    return reply.status(200).send(token)
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
