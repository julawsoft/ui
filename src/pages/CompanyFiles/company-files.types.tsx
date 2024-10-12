import { FilePdf } from 'phosphor-react'
const url = import.meta.env.VITE_BASE_URI

export const dataTransform = (data: any[]) => {
  return data?.map((item: any) => {
    return {
      ...item,
      creation: new Date(item.created_at).toLocaleDateString('pt-br', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      file: (
        <a
          href={url + 'open_file/' + item.attach}
          target="_blank"
          rel="noopener noreferrer"
        >
          {' '}
          <FilePdf size={32} />{' '}
        </a>
      ),
    }
  })
}
