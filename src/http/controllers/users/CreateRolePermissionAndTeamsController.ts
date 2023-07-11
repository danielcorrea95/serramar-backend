import { MakeCreateRolePermissionAndTeamsUseCase } from '@/UseCases/factories/users/MakeCreateRolePermissionAndTeamsUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function CreateRolePermissionAndTeamsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    userId: z.string(),
    roleName: z.string(),
    teamId: z.string().optional(),
    cupConfigId: z.string(),
  })

  const { userId, roleName, teamId, cupConfigId } = bodySchema.parse(
    request.body,
  )

  const createRolePermissionAndTeamsUseCase =
    MakeCreateRolePermissionAndTeamsUseCase()

  await createRolePermissionAndTeamsUseCase.execute({
    userId,
    roleName,
    teamId: teamId || null,
    cupConfigId,
  })

  return reply.status(200).send()
}
