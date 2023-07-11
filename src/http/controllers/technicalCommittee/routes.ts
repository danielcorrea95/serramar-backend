import { FastifyInstance } from 'fastify'
import { CreateTechnicalCommitteeController } from './CreateTechnicalCommitteeController'
import { VerifyJwt } from '@/http/middlewares/VerifyJWT'
import { can, is } from '@/http/middlewares/permissions'
import { ListTechnicalCommitteeTypesController } from './ListTechnicalCommitteeTypesController'
import { FindTechnicalCommitteeByDocumentController } from './FindTechnicalCommitteeByDocumentController'

export async function technicalCommitteeRoutes(app: FastifyInstance) {
  app.post(
    '/technical-committee',
    { onRequest: [VerifyJwt, can(['create_technical_committee'])] },
    CreateTechnicalCommitteeController,
  )

  app.get('/technical-committee-types', ListTechnicalCommitteeTypesController)

  app.get(
    '/technical-committee/find-by-document/:document',
    {
      onRequest: [
        VerifyJwt,
        can(['list_technical_committee']),
        is(['admin', 'gestor competicao', 'gestor equipe']),
      ],
    },
    FindTechnicalCommitteeByDocumentController,
  )
}
