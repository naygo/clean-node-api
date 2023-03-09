export class ServerError extends Error {
  constructor () {
    super('An expected error ocurred')
    this.name = 'ServerError'
  }
}
