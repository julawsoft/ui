import TimeOutError from './time-out.exception'

export default function timeoutPromise(
  promise: Promise<any>,
  seconds: number = 15,
  abortController: AbortController,
): Promise<Request> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      abortController.abort()
      reject(
        new TimeOutError(
          'Request timeout, A tua requisição excedeu o tempo máximo de ' +
            seconds +
            's',
          {
            cause:
              'A tua requisição excedeu o tempo máximo de ' + seconds + 's',
          },
        ),
      )
    }, seconds * 1000)
    promise.then(
      (res) => {
        clearTimeout(timeoutId)
        resolve(res)
      },
      (err) => {
        clearTimeout(timeoutId)
        reject(err)
      },
    )
  })
}
