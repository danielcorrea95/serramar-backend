import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { companyRoutes } from './http/controllers/companies/routes'
import { cupRoutes } from './http/controllers/cups/routes'
import { playerRoutes } from './http/controllers/players/routes'
import { sessionRoutes } from './http/controllers/sessions/routes'
import { teamRoutes } from './http/controllers/teams/routes'
import { userRoutes } from './http/controllers/users/routes'
import cors from '@fastify/cors'
import { rolesAndPermissionsRoutes } from './http/controllers/rolesAndPermissions/routes'
import { statesAndCitiesRoutes } from './http/controllers/statesAndCities/routes'
import { testeRoutes } from './http/controllers/teste/routes'
import { technicalCommitteeRoutes } from './http/controllers/technicalCommittee/routes'
import { gamesRoutes } from './http/controllers/games/routes'

export const app = fastify()

app.register(cors, {
  // put your options here
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
})
app.register(require('@fastify/multipart'))

app.register(testeRoutes)
app.register(rolesAndPermissionsRoutes)
app.register(sessionRoutes)
app.register(userRoutes)
app.register(companyRoutes)
app.register(cupRoutes)
app.register(teamRoutes)
app.register(playerRoutes)
app.register(technicalCommitteeRoutes)
app.register(statesAndCitiesRoutes)
app.register(gamesRoutes)

app.register(fastifyCookie)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // enviar erro para uma ferramenta externa de logs, DataDog, senty, newRelic
  }

  return reply.status(500).send({ message: 'Internal server error' })
})
