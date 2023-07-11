import { PermissionAlreadyExistsError } from '@/UseCases/errors/PermissionAlreadyExistsError'
import { MakeCreatePermissionUseCase } from '@/UseCases/factories/MakeCreatePermissionUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function CreatePermissionController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createPermissionBodySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
  })

  const { name, description } = createPermissionBodySchema.parse(request.body)

  try {
    const createPermissionUseCase = MakeCreatePermissionUseCase()

    const permission = await createPermissionUseCase.execute({
      name,
      description,
    })

    reply.code(201).send(permission)
  } catch (error) {
    if (error instanceof PermissionAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
