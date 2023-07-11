import { env } from '@/env'

export default {
  secret_token: env.JWT_SECRET,
  expires_in_token: '15m',
  secret_refresh_token: env.JWT_REFRESH_TOKEN,
  expires_in_refresh_token: '30d',
  expires_refresh_token_days: 30,
}
