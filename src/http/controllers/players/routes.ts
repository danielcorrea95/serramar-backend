import { VerifyJwt } from '@/http/middlewares/VerifyJWT'
import { FastifyInstance } from 'fastify'
import { CreatePlayerController } from './CreatePlayerController'
import { FindPlayerByDocumentController } from './FindPlayerByDocumentController'
import { GetPlayerByIdController } from './GetPlayerByIdController'
import { GetAllPlayerController } from './GetAllPlayerController'
import { can } from '@/http/middlewares/permissions'
import { UpdatePlayerController } from './UpdatePlayerController'
import { DeletePlayerController } from './DeletePlayerController'

export async function playerRoutes(app: FastifyInstance) {
  app.post(
    '/players',
    { onRequest: [VerifyJwt, can(['create_player'])] },
    CreatePlayerController,
  )

  app.get(
    '/players/document/:document',
    { onRequest: [VerifyJwt, can(['list_player'])] },
    FindPlayerByDocumentController,
  )

  app.get(
    '/players/id/:playerId',
    { onRequest: [VerifyJwt, can(['list_player'])] },
    GetPlayerByIdController,
  )

  app.get(
    '/players/page/:page',
    { onRequest: [VerifyJwt, can(['list_player'])] },
    GetAllPlayerController,
  )

  app.put(
    '/players/update/:playerId',
    { onRequest: [VerifyJwt, can(['update_player'])] },
    UpdatePlayerController,
  )

  app.delete(
    '/players/delete/:playerId',
    { onRequest: [VerifyJwt, can(['delete_player'])] },
    DeletePlayerController,
  )
}
