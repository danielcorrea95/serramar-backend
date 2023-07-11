import { RoleAlreadyExistsError } from '@/UseCases/errors/RoleAlreadyExistsError'
import { MakeCreateRoleUseCase } from '@/UseCases/factories/MakeCreateRoleUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function CreateRoleController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createRoleBodySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
  })

  const { name, description } = createRoleBodySchema.parse(request.body)

  try {
    const createRoleUseCase = MakeCreateRoleUseCase()

    const role = await createRoleUseCase.execute({ name, description })

    return reply.status(201).send({ role })
  } catch (error) {
    if (error instanceof RoleAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
