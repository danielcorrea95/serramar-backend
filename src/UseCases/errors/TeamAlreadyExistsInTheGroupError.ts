export class TeamAlreadyExistsInTheGroupError extends Error {
  constructor() {
    super('Team already exists in the group')
  }
}
