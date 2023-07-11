import { ResourceNotFoundError } from '@/UseCases/errors/ResourceNotFoundError'
import { UserAlreadyExistsByEmailError } from '@/UseCases/errors/UserAlreadyExistsByEmailError'
import { MakeUpdateProfileUseCase } from '@/UseCases/factories/users/MakeUpdateProfileUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function UpdateProfileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userIdParamSchema = z.object({
    id: z.string(),
  })

  const updateProfileBodySchema = z
    .object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().regex(/^$|^.{6,}$/, {
        message: 'A senha precisa ter ao menos 6 caracteres',
      }),
      confirmPassword: z.string().regex(/^$|^.{6,}$/, {
        message: 'A senha precisa ter ao menos 6 caracteres',
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'As senhas devem ser iguais',
      path: ['confirmPassword'],
    })

  const { id } = userIdParamSchema.parse(request.params)

  const { name, email, password } = updateProfileBodySchema.parse(request.body)

  try {
    const updateProfileUseCase = MakeUpdateProfileUseCase()

    const profile = await updateProfileUseCase.execute({
      id,
      name,
      email,
      password,
    })

    return reply.status(200).send(profile)
  } catch (error) {
    if (error instanceof UserAlreadyExistsByEmailError) {
      return reply.status(409).send({ message: error.message })
    }

    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
