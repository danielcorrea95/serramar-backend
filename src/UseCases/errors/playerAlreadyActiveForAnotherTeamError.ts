export class PlayerAlreadyActiveForAnotherTeamError extends Error {
  constructor() {
    super('Player already active for another team')
  }
}
