/*
interface ApiErrorResponse {
  type: string
  value: string,
  msg: string,
  path: string
  location: string
}
*/

export function handleApiErrorResponse(error: any[]): string {
  let message = "";
  if (error && error.length) {
    error.forEach((err) => {
      message += `${err.msg}\n`;
    });
    return message.trim();
  }
  return message
}