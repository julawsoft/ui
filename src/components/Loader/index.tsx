import { LoaderContainer } from './styled'
import BeatLoader from 'react-spinners/BeatLoader'

export function Loader() {
  return (
    <LoaderContainer>
      <BeatLoader
        color="#C2912E"
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <p>Processando...</p>
    </LoaderContainer>
  )
}
