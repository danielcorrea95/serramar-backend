export class TechnicalCommitteeAlreadyExistsError extends Error {
  constructor() {
    super('Coaching staff already exists in another team')
  }
}
