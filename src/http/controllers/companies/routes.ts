import { VerifyJwt } from '@/http/middlewares/VerifyJWT'
import { FastifyInstance } from 'fastify'
import { CreateCompanyController } from './CreateCompanyController'
import GetAllCompanyController from './GetAllCompanyController'
import { can } from '@/http/middlewares/permissions'
import { GetCompanyByIdController } from './GetCompanyByIdController'
import { UpdateCompanyController } from './UpdateCompanyController'
import { DeleteCompanyController } from './DeleteCompanyController'

export async function companyRoutes(app: FastifyInstance) {
  app.post(
    '/companies',
    { onRequest: [VerifyJwt, can(['create_company'])] },
    CreateCompanyController,
  )

  app.get(
    '/companies/page/:page',
    { onRequest: [VerifyJwt, can(['list_company'])] },
    GetAllCompanyController,
  )
  app.get(
    '/companies/id/:companyId',
    { onRequest: [VerifyJwt, can(['list_company'])] },
    GetCompanyByIdController,
  )

  app.put(
    '/companies/update/:companyId',
    { onRequest: [VerifyJwt, can(['update_company'])] },
    UpdateCompanyController,
  )

  app.delete(
    '/companies/delete/:companyId',
    { onRequest: [VerifyJwt, can(['delete_company'])] },
    DeleteCompanyController,
  )
}
