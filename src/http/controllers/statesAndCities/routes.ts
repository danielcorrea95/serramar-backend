import { VerifyJwt } from '@/http/middlewares/VerifyJWT'
import { FastifyInstance } from 'fastify'
import GetAllStateController from './GetAllStateController'
import GetCityByStateIdController from './GetCityByStateIdController'

export async function statesAndCitiesRoutes(app: FastifyInstance) {
  app.get('/states', { onRequest: [VerifyJwt] }, GetAllStateController)

  app.get(
    '/cities/:stateId',
    { onRequest: [VerifyJwt] },
    GetCityByStateIdController,
  )
}
