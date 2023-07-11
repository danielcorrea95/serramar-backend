import { GameNotFoundError } from '@/UseCases/errors/GameNotFoundError'
import { TeamANotFoundError } from '@/UseCases/errors/TeamANotFoundError'
import { TeamBNotFoundError } from '@/UseCases/errors/TeamBNotFoundError'
import { MakeAssembleScoresheetByGameIdUseCase } from '@/UseCases/factories/games/scoresheet/MakeAssembleScoresheetByGameIdUseCase'
import { MakeGetPlayersByGameIdUseCase } from '@/UseCases/factories/games/scoresheet/MakeGetPlayersByGameIdUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import fs from 'fs'
import { z } from 'zod'

export async function AssembleScoreheetByGamesIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const gameIdParamSchema = z.object({
    gameId: z.string(),
  })

  const { gameId } = gameIdParamSchema.parse(request.params)

  const getPlayersByGameIdUseCase = MakeGetPlayersByGameIdUseCase()

  const assembleScoreheetByGamesIdUseCase =
    MakeAssembleScoresheetByGameIdUseCase()

  try {
    const dataGames = await getPlayersByGameIdUseCase.execute(gameId)

    await assembleScoreheetByGamesIdUseCase.execute(dataGames)

    const filePath = './assets/games/sumula.docx'

    const stream = fs.createReadStream(filePath)
    stream.on('error', (error) => {
      reply.send(error)
    })

    reply.header('Content-Disposition', 'attachment; filename=sumula.docx')
    reply.type('application/octet-stream')

    stream.pipe(reply.raw)
  } catch (error) {
    if (error instanceof GameNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    if (error instanceof TeamANotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    if (error instanceof TeamBNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
