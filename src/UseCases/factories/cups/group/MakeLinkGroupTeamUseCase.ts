import { LinkGroupTeamUseCase } from '@/UseCases/cups/group/LinkGroupTeamUseCase'
import { PrismaGroupTeamRepository } from '@/repositories/prisma/PrismaGroupTeamRepository'

export function MakeLinkGroupTeamUseCase() {
  const prismaGroupTeamRepository = new PrismaGroupTeamRepository()
  const linkGroupTeamUseCase = new LinkGroupTeamUseCase(
    prismaGroupTeamRepository,
  )

  return linkGroupTeamUseCase
}
