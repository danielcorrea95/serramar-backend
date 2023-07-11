export class CardTypeAlreadyExistsError extends Error {
  constructor() {
    super('Card type already exists')
  }
}
