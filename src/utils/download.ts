export const downloadFile = async (path: string, fileName: string) => {
    try {
      const response = await fetch(path)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()

      // Remove o elemento após o Clica
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Erro ao baixar o arquivo:', error)
    }
  }