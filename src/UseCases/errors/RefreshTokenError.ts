export class RefreshTokenError extends Error {
  constructor() {
    super('Refresh Token does not exist')
  }
}
