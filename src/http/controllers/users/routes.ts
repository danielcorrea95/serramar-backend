import { VerifyJwt } from '@/http/middlewares/VerifyJWT'
import { FastifyInstance } from 'fastify'
import { ListAllUsersController } from './ListAllUsersController'
import { ProfileController } from './ProfileController'
import { RegisterController } from './RegisterController'
import { can } from '@/http/middlewares/permissions'
import { UpdateProfileController } from './UpdateProfileController'
import { UpdateContextUserController } from './UpdateContextUserController'
import { CreateRolePermissionAndTeamsController } from './CreateRolePermissionAndTeamsController'

export async function userRoutes(app: FastifyInstance) {
  app.post(
    '/users',
    { onRequest: [VerifyJwt, can(['create_user'])] },
    RegisterController,
  )

  app.post(
    '/users/role/permissions/teams',
    { onRequest: [VerifyJwt, can(['create_user'])] },
    CreateRolePermissionAndTeamsController,
  )

  app.put('/users/update/:id', UpdateProfileController)

  app.get(
    '/me',
    { onRequest: [VerifyJwt, can(['list_user'])] },
    ProfileController,
  )

  app.get('/users/list', ListAllUsersController)

  // update contect user
  app.put(
    '/users/update-context/:userId',
    { onRequest: [VerifyJwt, can(['update_user'])] },
    UpdateContextUserController,
  )
}
