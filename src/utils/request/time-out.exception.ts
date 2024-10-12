export default class TimeOutError extends Error {
  constructor(msg: string, options: ErrorOptions) {
    super(msg, options)
    Object.setPrototypeOf(this, TimeOutError.prototype)
  }
}
