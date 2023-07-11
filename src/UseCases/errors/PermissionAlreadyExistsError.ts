export class PermissionAlreadyExistsError extends Error {
  constructor() {
    super('Permission already exists')
  }
}
