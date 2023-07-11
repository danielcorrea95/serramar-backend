import { MakeGetAllStateUseCase } from '@/UseCases/factories/MakeGetAllStateUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'

export default async function GetAllStateController(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const getAllStateUseCase = MakeGetAllStateUseCase()

  const states = await getAllStateUseCase.execute()

  return reply.code(200).send(states)
}
