import { Crop } from 'react-image-crop'

function dataURLtoFile(
  dataurl: any,
  filename: string,
  setCroppedFile: (value: any) => void,
) {
  const arr = dataurl.split(',')

  if (!arr || arr === null) throw new Error('Arquivo inválido')

  const mime = arr[0].match(/:(.*?);/)![1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  const croppedImage = new File([u8arr], filename, { type: mime })
  setCroppedFile(croppedImage)
}

export function getCroppedImg(
  image: HTMLImageElement,
  crop: Crop,
  setCroppedFile: (value: any) => void,
) {
  const canvas = document.createElement('canvas')
  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  canvas.width = crop.width
  canvas.height = crop.height
  const ctx = canvas.getContext('2d')

  ctx?.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height,
  )

  const reader = new FileReader()

  canvas.toBlob((blob) => {
    if (!blob) throw new Error('Arquivo inválido')

    reader.readAsDataURL(blob)
    reader.onloadend = () => {
      dataURLtoFile(reader.result, 'cropped.jpg', setCroppedFile)
    }
  })
}
