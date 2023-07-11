import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsByEmailError } from '@/UseCases/errors/UserAlreadyExistsByEmailError'
import { UserAlreadyExistsByUsernameError } from '@/UseCases/errors/UserAlreadyExistsByUsernameError'
import { MakeRegisterUseCase } from '@/UseCases/factories/MakeRegisterUseCase'

export async function RegisterController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z
    .object({
      name: z.string(),
      email: z.string().email(),
      username: z.string(),
      password: z.string().min(6).trim(),
      confirmPassword: z.string().min(6).trim(),
      isAdmin: z.boolean().optional().default(false),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'As senhas devem ser iguais',
      path: ['confirmPassword'],
    })

  const { name, email, username, password, isAdmin } = registerBodySchema.parse(
    request.body,
  )

  try {
    const registerUseCase = MakeRegisterUseCase()

    const { user } = await registerUseCase.execute({
      name,
      email,
      username,
      password,
      isAdmin,
    })

    return reply.status(201).send(user)
  } catch (error) {
    if (error instanceof UserAlreadyExistsByEmailError) {
      return reply.status(409).send({ message: error.message })
    }

    if (error instanceof UserAlreadyExistsByUsernameError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
