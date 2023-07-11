import { app } from './app'
import { env } from './env'

process.env.TZ = 'GMT'
app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('🚀 HTTP server Running!')
  })
