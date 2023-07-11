import { FastifyInstance } from 'fastify'
import { TesteController } from './TesteController'

export async function testeRoutes(app: FastifyInstance) {
  app.get('/teste', TesteController)
}
