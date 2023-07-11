import { ResourceNotFoundError } from '@/UseCases/errors/ResourceNotFoundError'
import { MakeCreateUserAccessListControlUseCase } from '@/UseCases/factories/MakeCreateUserAccessControlListUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function CreateUserAccessControlListController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createUserAccessControlListBodySchema = z.object({
    userId: z.string(),
    roleId: z.string().array(),
    permissionId: z.string().array(),
  })

  const { userId, roleId, permissionId } =
    createUserAccessControlListBodySchema.parse(request.body)

  try {
    const createUserAccessControlListUseCase =
      MakeCreateUserAccessListControlUseCase()

    const user = await createUserAccessControlListUseCase.execute({
      userId,
      permissions: permissionId,
      roles: roleId,
    })

    return reply.status(201).send(user)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send(error.message)
    }

    throw error
  }
}
