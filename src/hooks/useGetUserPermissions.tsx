import useColabContext from '../context_api'

function useGetUserPermissions() {
  const { colabProvider } = useColabContext()
  return colabProvider.auth
}

export default useGetUserPermissions
