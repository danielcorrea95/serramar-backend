import { MakeCreateTechnicalCommitteeUseCase } from '@/UseCases/factories/technicalCommittee/MakeCreateTechnicalCommitteeUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function CreateTechnicalCommitteeController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createTechnicalCommitteeBodySchema = z.object({
    name: z
      .string()
      .min(3, { message: 'O campo deve ter no mínimo 3 caracteres' }),
    document: z.string(),
    phone: z.string().nullable(),
    attachment: z.string().nullable(),
  })

  let newPhone = null
  let newDocument = null
  let newAttachment = null

  const { name, document, attachment, phone } =
    createTechnicalCommitteeBodySchema.parse(request.body)

  newDocument = document.replace(/[^0-9]/g, '')

  if (phone) {
    newPhone = phone.replace(/[^0-9]/g, '')
  }

  if (attachment) {
    newAttachment = attachment.replace(/[^0-9]/g, '')
  }

  const createTechnicalCommitteeUseCase = MakeCreateTechnicalCommitteeUseCase()

  const createTechnicalCommittee =
    await createTechnicalCommitteeUseCase.execute({
      name,
      phone: newPhone,
      document: newDocument,
      attachment: newAttachment,
    })

  return createTechnicalCommittee
}
