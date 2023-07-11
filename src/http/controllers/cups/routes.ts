import { VerifyJwt } from '@/http/middlewares/VerifyJWT'
import { FastifyInstance } from 'fastify'
import { CreateCupController } from './CreateCupController'
import { CreateCategoryTeamController } from './categoryTeam/CreateCategoryTeamController'
import { ActiveCupConfigController } from './cupConfig/ActiveCupConfigController'
import { CreateCardTypeController } from './cardType/CreateCardTypeController'
import { CreateCategoryController } from './category/CreateCategoryController'
import { CreateCupConfigController } from './cupConfig/CreateCupConfigController'
import { GetTeamByCategoryIdController } from './categoryTeam/GetTeamByCategoryIdController'
import { GetPlayerByCategoryIdAndTeamIdController } from './categoryPlayerTeam/GetPlayerByCategoryIdAndTeamIdController'
import { can } from '@/http/middlewares/permissions'
import { LinkCategoryPlayerTeamController } from './categoryPlayerTeam/LinkCategoryPlayerTeamController'
import { UploadImagePlayerController } from './categoryPlayerTeam/UploadImagePlayerController'
import multer from 'fastify-multer'
import uploadConfig from '@/config/Upload'
import { ListCupConfigToContextByTeamIdController } from './cupConfig/ListCupConfigToContextByTeamIdController'
import { ListCategoryToContextByCupConfigIdAndTeamIdController } from './category/ListCategoryToContextByCupConfigIdAndTeamIdController'
import { LinkCategoryTeamTechnicalCommitteeController } from './categoryTeamTechnicalCommittee/LinkCategoryTeamTechnicalCommitteeController'
import { GetTechnicalCommitteeByTeamIdAndCategoryIdController } from './categoryTeamTechnicalCommittee/GetTechnicalCommitteeByTeamIdAndCategoryIdController'
import { DeleteLinkByPlayerIdTeamIdCategoryController } from './categoryPlayerTeam/DeleteLinkByPlayerIdTeamIdCategoryIdController'
import { DeleteLinkByTechnicalCommitteeIdTeamIdCategoryIdController } from './categoryTeamTechnicalCommittee/DeleteLinkByTechnicalCommitteeIdTeamIdCategoryIdController'
import { UploadImageTechnicalCommitteeController } from './categoryTeamTechnicalCommittee/UploadImageTechnicalCommitteeController'
import { GetLinkIdByCategoryIdPlayerIdTeamIdController } from './categoryPlayerTeam/GetLinkIdByCategoryIdPlayerIdTeamIdController'
import { GetCategoryWithTeamsToSiteByCupConfigIdController } from './categoryTeam/GetCategoryWithTeamsByCupConfigIdController'
import { GetPlayerByCategoryIdAndTeamIdToSiteController } from './categoryPlayerTeam/GetPlayerByCategoryIdAndTeamIdToSiteController'

export async function cupRoutes(app: FastifyInstance) {
  const upload = multer(uploadConfig)

  app.post('/cups', { onRequest: [VerifyJwt] }, CreateCupController)

  app.post('/cup-config', { onRequest: [VerifyJwt] }, CreateCupConfigController)
  app.put(
    '/active-cup-config',
    { onRequest: [VerifyJwt] },
    ActiveCupConfigController,
  )

  app.post('/card-types', { onRequest: [VerifyJwt] }, CreateCardTypeController)

  app.post('/category', { onRequest: [VerifyJwt] }, CreateCategoryController)

  app.post(
    '/category/team/:categoryId',
    { onRequest: [VerifyJwt] },
    CreateCategoryTeamController,
  )

  app.get(
    '/category/team/:categoryId',
    { onRequest: [VerifyJwt] },
    GetTeamByCategoryIdController,
  )

  // list cup by team id
  app.get(
    '/cups/context/team-id/:teamId',
    { onRequest: [VerifyJwt] },
    ListCupConfigToContextByTeamIdController,
  )

  // list categories by team id and cup id
  app.get(
    '/categories/context/team-id/cup-config-id/:teamId/:cupConfigId',
    { onRequest: [VerifyJwt] },
    ListCategoryToContextByCupConfigIdAndTeamIdController,
  )

  app.post(
    '/link-category-player-team',
    { onRequest: [VerifyJwt] },
    LinkCategoryPlayerTeamController,
  )

  app.get(
    '/get-link-id/category-id/team-id/player-id/:categoryId/:teamId/:playerId',
    { onRequest: [VerifyJwt, can(['update_player'])] },
    GetLinkIdByCategoryIdPlayerIdTeamIdController,
  )

  // upload image player
  app.patch(
    '/image-player/:linkId',
    {
      preHandler: upload.single('filename'),
      onRequest: [VerifyJwt, can(['update_player'])],
    },
    UploadImagePlayerController,
  )

  // list players by team id and category id
  app.get(
    '/players/category-id/team-id/:categoryId/:teamId',
    { onRequest: [VerifyJwt, can(['list_player'])] },
    GetPlayerByCategoryIdAndTeamIdController,
  )

  app.delete(
    '/delete-player/by-player-team-category-id/:playerId/:teamId/:categoryId',
    { onRequest: [VerifyJwt, can(['delete_player'])] },
    DeleteLinkByPlayerIdTeamIdCategoryController,
  )

  // Technical Committee
  // create technical committee
  app.post(
    '/link-category-team-technical-committee',
    { onRequest: [VerifyJwt, can(['create_technical_committee'])] },
    LinkCategoryTeamTechnicalCommitteeController,
  )

  app.get(
    '/link-category-team-technical-committee/:teamId/:categoryId',
    { onRequest: [VerifyJwt, can(['list_technical_committee'])] },
    GetTechnicalCommitteeByTeamIdAndCategoryIdController,
  )

  // upload image technical committee
  // upload image player
  app.patch(
    '/image-technical-committee/:linkId',
    {
      preHandler: upload.single('filename'),
      onRequest: [VerifyJwt, can(['update_technical_committee'])],
    },
    UploadImageTechnicalCommitteeController,
  )

  app.delete(
    '/delete-technical-committee/by-technical-committee-team-category-id/:teamId/:categoryId/:technicalCommitteeId',
    { onRequest: [VerifyJwt, can(['delete_technical_committee'])] },
    DeleteLinkByTechnicalCommitteeIdTeamIdCategoryIdController,
  )

  // get categories with teams by cup config id
  app.get(
    '/categories-with-teams/cup-config-id',
    GetCategoryWithTeamsToSiteByCupConfigIdController,
  )

  // get players by category id and team id to site
  app.get(
    '/players/to-site/category-id/team-id/:categoryId/:teamId',
    GetPlayerByCategoryIdAndTeamIdToSiteController,
  )
}
