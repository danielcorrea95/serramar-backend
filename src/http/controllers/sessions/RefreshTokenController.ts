import { MakeRefreshTokenUseCase } from '@/UseCases/factories/MakeRefreshTokenUseCase'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function RefreshTokenController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createTokenSchema = z.object({
    token: z.string(),
  })

  const { token } = createTokenSchema.parse(
    request.body || request.headers['x-access-token'] || request.query,
  )

  const refreshTokenUseCase = MakeRefreshTokenUseCase()

  const refreshToken = await refreshTokenUseCase.execute(token)

  return reply.status(201).send(refreshToken)
}
