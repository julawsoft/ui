import CryptoJS from 'crypto-js'

const secretKey = '5ffcf94da07c6dd7810a94f28bf0ac93'

export function setLocalStorageSecret(key: string, data: string) {
  const dataCipher = CryptoJS.AES.encrypt(data, secretKey).toString()
  localStorage.setItem(key, dataCipher)
}

export function getLocalStorageSecret(key: string) {
  const dataCipher: string = localStorage.getItem(key) ?? ''
  const bytes = CryptoJS.AES.decrypt(dataCipher, secretKey)
  return bytes.toString(CryptoJS.enc.Utf8)
}

export function clearLocalStorageSecret() {
  localStorage.clear()
}
