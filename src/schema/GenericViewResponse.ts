export interface IGenericViewResponse<T> {
  data: T
  time?: Date
  response: {
    statusCode: number
    message: string
  }
}
