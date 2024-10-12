import { jwtDecode } from 'jwt-js-decode'

import Conveter from 'timestamp-conv'

export const tokenHasExpired = (accessToken: any) => {
  const token = jwtDecode(accessToken)
  const { iat, exp } = token.payload
  const dateNow = new Conveter.timestamp(new Date().getTime()).formatHour
  
  const dateExpiredToken = new Conveter.date(exp).formatHour

  console.log(dateExpiredToken)

  return dateExpiredToken < dateNow
}
