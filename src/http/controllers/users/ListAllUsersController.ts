import { MakeListAllUsersUseCase } from '@/UseCases/factories/MakeListAllUsersUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function ListAllUsersController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const listAllUsersUseCase = MakeListAllUsersUseCase()

  const user = await listAllUsersUseCase.execute()

  return reply.status(200).send(user)
}
