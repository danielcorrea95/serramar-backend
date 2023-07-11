import { MakeGetRolesUseCase } from '@/UseCases/factories/rolesAndPermissions/MakeGetRolesUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function GetRolesController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = request.user.sub

  const getRolesUseCase = MakeGetRolesUseCase()

  const roles = await getRolesUseCase.execute(userId)

  return reply.status(200).send(roles)
}
