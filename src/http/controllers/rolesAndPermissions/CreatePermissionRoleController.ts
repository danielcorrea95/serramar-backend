import { ResourceNotFoundError } from '@/UseCases/errors/ResourceNotFoundError'
import { MakeCreatePermissionRoleUseCase } from '@/UseCases/factories/MakeCreatePermissionRoleUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function CreatePermissionRoleController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const roleIdParamSchema = z.object({
    roleId: z.string(),
  })

  const permissionBodyRequest = z.object({
    permissionId: z.string().array(),
  })

  const { roleId } = roleIdParamSchema.parse(request.params)
  const { permissionId } = permissionBodyRequest.parse(request.body)

  try {
    const createPermissionRoleUseCase = MakeCreatePermissionRoleUseCase()

    await createPermissionRoleUseCase.execute({
      roleId,
      permissionId,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.code(404).send({ message: error.message })
    }

    throw error
  }
}
