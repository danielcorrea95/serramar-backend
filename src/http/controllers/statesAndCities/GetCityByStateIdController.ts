import { MakeGetCityByStateIdUseCase } from '@/UseCases/factories/MakeGetCityByStateIdUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export default async function GetCityByStateIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const stateIdParamSchema = z.object({
    stateId: z.string(),
  })

  const { stateId } = stateIdParamSchema.parse(request.params)

  const state = Number(stateId)

  const getCityByStateIdUseCase = MakeGetCityByStateIdUseCase()

  const cities = await getCityByStateIdUseCase.execute({ stateId: state })

  return reply.status(200).send(cities)
}
