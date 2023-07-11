export class UserAlreadyExistsByUsernameError extends Error {
  constructor() {
    super('Username already exists')
  }
}
