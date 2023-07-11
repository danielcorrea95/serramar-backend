import { FastifyReply, FastifyRequest } from 'fastify'

export async function TesteController(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  return reply.status(200).send({ message: 'Sucesso' })
}
