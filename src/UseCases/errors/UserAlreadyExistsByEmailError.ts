export class UserAlreadyExistsByEmailError extends Error {
  constructor() {
    super('E-mail already exists')
  }
}
