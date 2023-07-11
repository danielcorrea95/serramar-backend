import { VerifyJwt } from '@/http/middlewares/VerifyJWT'
import { FastifyInstance } from 'fastify'
import { CreatePermissionController } from './CreatePermissionController'
import { CreatePermissionRoleController } from './CreatePermissionRoleController'
import { CreateRoleController } from './CreateRoleController'
import { CreateUserAccessControlListController } from './CreateUserAccessControlListController'
import { GetRolesController } from './GetRolesController'

export async function rolesAndPermissionsRoutes(app: FastifyInstance) {
  app.post('/role', { onRequest: [VerifyJwt] }, CreateRoleController)

  app.post(
    '/permission',
    { onRequest: [VerifyJwt] },
    CreatePermissionController,
  )

  app.post('/users/acl', CreateUserAccessControlListController)

  app.post(
    '/roles/:roleId',
    { onRequest: [VerifyJwt] },
    CreatePermissionRoleController,
  )

  app.get('/roles', { onRequest: [VerifyJwt] }, GetRolesController)
}
