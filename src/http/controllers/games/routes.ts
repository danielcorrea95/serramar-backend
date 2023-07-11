import { FastifyInstance } from 'fastify'
import { FindGamesByCupConfigIdController } from './FindGamesByCupConfigIdController'
import { VerifyJwt } from '@/http/middlewares/VerifyJWT'
import { can } from '@/http/middlewares/permissions'
import { FindOldFourGamesToSiteByCupConfigIdController } from './FindOldFourGamesToSiteByCupConfigIdController'
import { FindGamesTodayToSiteByCupConfigIdController } from './FindGamesTodayToSiteByCupConfigIdController'
import { FindAllGamesToSiteByCupConfigIdController } from './FindAllGamesToSiteByCupConfigIdController'
import { AssembleScoreheetByGamesIdController } from './scoresheet/AssembleScoresheetByGameIdController'
import { CreateGameDetailsController } from './scoresheet/CreateGameDetailsController'
import { UpdateGameDetailsByIdController } from './scoresheet/UpdateGameDetailsByIdController'
import { FindGameByIdAllDataController } from './scoresheet/FindGameByIdAllDataController'
import { CreatePlayerNumberByGameIdController } from './scoresheet/CreatePlayerNumberByGameIdController'
import { FindNextFourGamesToSiteByCupConfigIdController } from './findNextFourGamesToSiteByCupConfigIdController'

export async function gamesRoutes(app: FastifyInstance) {
  app.get(
    '/games/cup-config-id/:cupConfigId',
    { onRequest: [VerifyJwt, can(['list_games'])] },
    FindGamesByCupConfigIdController,
  )

  app.get(
    '/games/next-four-games',
    FindNextFourGamesToSiteByCupConfigIdController,
  )

  app.get(
    '/games/old-four-games',
    FindOldFourGamesToSiteByCupConfigIdController,
  )

  app.get('/games/games-today', FindGamesTodayToSiteByCupConfigIdController)

  app.get('/games/all-games', FindAllGamesToSiteByCupConfigIdController)

  // scoresheetRoutes
  app.get(
    '/scoresheet/games/:gameId',
    { onRequest: [VerifyJwt, can(['scoresheet_doc'])] },
    AssembleScoreheetByGamesIdController,
  )

  app.get(
    '/games/details/:gameId',
    { onRequest: [VerifyJwt, can(['scoresheet_create'])] },
    CreateGameDetailsController,
  )

  app.get(
    '/scoresheet/all-data/games/:gameId',
    { onRequest: [VerifyJwt, can(['scoresheet_create'])] },
    FindGameByIdAllDataController,
  )

  app.put(
    '/games/details/update/:gameDetailId',
    { onRequest: [VerifyJwt, can(['scoresheet_create'])] },
    UpdateGameDetailsByIdController,
  )

  app.put(
    '/games/players/number/:gameId',
    { onRequest: [VerifyJwt, can(['scoresheet_create'])] },
    CreatePlayerNumberByGameIdController,
  )
}
