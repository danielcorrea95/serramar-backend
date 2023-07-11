import { makeGetUserProfileUseCase } from '@/UseCases/factories/MakeGetUserProfileUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function ProfileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserProfileUseCase = makeGetUserProfileUseCase()

  const { user, permissions, roles } = await getUserProfileUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
    permissions,
    roles,
  })
}
