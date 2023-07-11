import { FastifyInstance } from 'fastify'
import { AuthenticateController } from './AuthenticateController'
import { RefreshTokenController } from './RefreshTokenController'

export async function sessionRoutes(app: FastifyInstance) {
  app.post('/sessions', AuthenticateController)
  app.post('/token/refresh', RefreshTokenController)
}
