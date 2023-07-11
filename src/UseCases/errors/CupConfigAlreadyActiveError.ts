export class CupConfigAlreadyActiveError extends Error {
  constructor() {
    super('Cup config already active')
  }
}
