import { VerifyJwt } from '@/http/middlewares/VerifyJWT'
import { FastifyInstance } from 'fastify'
import { CreateTeamController } from './CreateTeamController'
import { can } from '@/http/middlewares/permissions'
import { GetAllTeamController } from './GetAllTeamController'
import { GetTeamByIdController } from './GetTeamByIdController'
import { UpdateTeamController } from './UpdataTeamController'
import { DeleteTeamController } from './DeleteTeamController'
import { UploadShieldTeamController } from './UploadShieldTeamController'
import multer from 'fastify-multer'
import uploadConfig from '@/config/Upload'
import { ListTeamsToContextByUserIdController } from './ListTeamsToContextByUserIdController'
import { GetTeamByIdToSiteController } from './GetTeamByIdToSiteController'

export async function teamRoutes(app: FastifyInstance) {
  const upload = multer(uploadConfig)

  // create team
  app.post(
    '/teams',
    { onRequest: [VerifyJwt, can(['create_team'])] },
    CreateTeamController,
  )

  // upload shield image team
  app.patch(
    '/teams/shield/:teamId',
    {
      preHandler: upload.single('filename'),
      onRequest: [VerifyJwt, can(['update_team'])],
    },
    UploadShieldTeamController,
  )

  // list all teams
  app.get(
    '/teams/page/:page',
    { onRequest: [VerifyJwt, can(['list_team'])] },
    GetAllTeamController,
  )

  // list team by id
  app.get(
    '/teams/id/:teamId',
    { onRequest: [VerifyJwt, can(['list_team'])] },
    GetTeamByIdController,
  )

  // update team
  app.put(
    '/teams/update/:teamId',
    { onRequest: [VerifyJwt, can(['update_team'])] },
    UpdateTeamController,
  )

  // delete team
  app.delete(
    '/teams/delete/:teamId',
    { onRequest: [VerifyJwt, can(['delete_team'])] },
    DeleteTeamController,
  )

  // list teams by user id
  app.get(
    '/teams/context/user-id/:userId',
    { onRequest: [VerifyJwt] },
    ListTeamsToContextByUserIdController,
  )

  // list team by id to site
  app.get('/team/id/site/:teamId', GetTeamByIdToSiteController)
}
