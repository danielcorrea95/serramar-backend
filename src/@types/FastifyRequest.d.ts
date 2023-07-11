import 'fastify'

declare module 'fastify' {
  export interface FastifyRequest {
    file: {
      filename: string
    }
  }
}
