import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { getLocalStorageSecret, setLocalStorageSecret } from './utils'

/*
"accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJmTF9ZWmFDQmVyM2FqMjliamttTUdIR181UGs1d0hDYmZtZ0h5Y0FYYWJ3In0.eyJleHAiOjE3MTc0MjEyMTYsImlhdCI6MTcxNzQxOTcxNiwianRpIjoiMzQ4Y2RhODktYzY4NC00M2Y0LTg3MTktMTJhY2ZiMjRkNDAxIiwiaXNzIjoiaHR0cHM6Ly8xOTIuMTY4LjIwLjU0L2F1dGgvcmVhbG1zL0NldGltIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjNlYWY2YmFhLWIxMDMtNDJjMC05ZDM0LTBmNzA5YzNiZmUwOCIsInR5cCI6IkJlYXJlciIsImF6cCI6ImNvbGFiIiwic2Vzc2lvbl9zdGF0ZSI6ImI3OGU5MjAxLWNmOGEtNDFkZC04NWUwLTNjNjA0OTI4ZjE3MSIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLWNldGltIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiJiNzhlOTIwMS1jZjhhLTQxZGQtODVlMC0zYzYwNDkyOGYxNzEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1hbnVlbGEgRmVybmFuZGVzIiwiZ3JvdXBzIjpbIi9jb2xhYiJdLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtZmVybmFuZGVzMUBjZXRpbS5tcyIsImdpdmVuX25hbWUiOiJNYW51ZWxhIiwiZmFtaWx5X25hbWUiOiJGZXJuYW5kZXMiLCJlbWFpbCI6Im1mZXJuYW5kZXMxQGNldGltLm1zIn0.kprAxiIcHx1pJII-kaNfmKUdEjr6EAm98nWDCzBTFd9Gmu0_v1z1uWGFGpdWD_sMNTvmoBaCMH_gmD7eQ8YqQRfW5cngORSWnxkX8yE8kOnqXkLrqqh1rblpiApTRFkx9qnwK8dJs-6nid2s05E5Si8R475_ygOQQ70a0lEd6QWENbgxwUNEO8Atc7w2S_FvlK1k44W-3PCtnxUhDS2qApNuYqP3aVDq8lKCSfzahGiG1vHhogDxbCwYfXp6WBioGoXqdvFqBMLL-jnV_rpYUVzfU8mHGyGrJDATn3Kp6yon3ga23xOGGHaJhrwL3bTqYMtpahc3LuTTGrX6EK9COA",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3N2I3YmI2Zi1mYjgzLTRlZmEtYmQ2Yi1jNmFlZDZiNjIyM2MifQ.eyJleHAiOjE3MTc0MjE1MTYsImlhdCI6MTcxNzQxOTcxNiwianRpIjoiMzIxMmFiMWQtYjg1ZS00MjJiLWI2MjItMDliYzU1OGU2Y2QzIiwiaXNzIjoiaHR0cHM6Ly8xOTIuMTY4LjIwLjU0L2F1dGgvcmVhbG1zL0NldGltIiwiYXVkIjoiaHR0cHM6Ly8xOTIuMTY4LjIwLjU0L2F1dGgvcmVhbG1zL0NldGltIiwic3ViIjoiM2VhZjZiYWEtYjEwMy00MmMwLTlkMzQtMGY3MDljM2JmZTA4IiwidHlwIjoiUmVmcmVzaCIsImF6cCI6ImNvbGFiIiwic2Vzc2lvbl9zdGF0ZSI6ImI3OGU5MjAxLWNmOGEtNDFkZC04NWUwLTNjNjA0OTI4ZjE3MSIsInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6ImI3OGU5MjAxLWNmOGEtNDFkZC04NWUwLTNjNjA0OTI4ZjE3MSJ9.j9xSsAkrZjNoohASPQDqg902RfA5P7MpmfSX_O82X0c",
        "userInfo": {
            "sub": "3eaf6baa-b103-42c0-9d34-0f709c3bfe08",
            "email_verified": true,
            "name": "Manuela Fernandes",
            "groups": [
                "/colab"
            ],
            "preferred_username": "mfernandes1@cetim.ms",
            "given_name": "Manuela",
            "family_name": "Fernandes",
            "email": "mfernandes1@cetim.ms"
        },
        "groups": [
            {
                "id": "9ab899ac-a546-4675-b8ca-5c8a5084f419",
                "name": "colab",
                "path": "/colab"
            }
        ],
        "employee": {
            "id": 1,
            "employee_id": 4,
            "email": "mfernandes1@cetim.ms",
            "user_id": "3eaf6baa-b103-42c0-9d34-0f709c3bfe08",
            "created_at": "2024-06-03T11:45:53.333Z",
            "updated_at": "2024-06-03T11:45:53.333Z"
        }

*/
export const keyLocalStorage: string = 'provider_colab'

interface IAuth {
  isLogged: boolean
  accessToken: string
  refreshToken: string
  sub: string
  profile: string
  roles: string[]
}

interface IUser {
  id: number
  name: string
  funcao: string
  image: string
  email: string
  status: string
}

interface INotifications {
  isActive: boolean
}

interface ISystem {
  company: string
  software: string
  version: string
  build: string
  licenseType: string
  moreInfo: string
}

interface IMenu {
  sidebarIsActive: boolean
  index: number
  isDisabled: boolean
  isExpanded: boolean
  subMenuIndex: number
  subMenuIsDisabled: boolean
}

export interface IColabContext {
  auth: IAuth
  user: IUser
  notifications: INotifications
  system: ISystem
  menu: IMenu
}

interface IData {
  colabProvider: IColabContext
  setData: (data: IColabContext) => void
}

const ColabContext = createContext<IData>({} as IData)

export let initialState: IColabContext = {
  auth: {
    isLogged: false,
    accessToken: '',
    refreshToken: '',
    sub: '',
    profile: '',
    roles: [],
  },
  user: {
    id: 0,
    name: '',
    funcao: '',
    image: '',
    email: '',
    status: '',
  },
  notifications: {
    isActive: false,
  },
  system: {
    company: 'Cetim Tecnologia, SA',
    software: 'Colab',
    version: '2.0.1',
    build: 'dhiqyw/24',
    licenseType: 'pay',
    moreInfo: 'https://colab.ao',
  },
  menu: {
    sidebarIsActive: true,
    index: 1,
    isDisabled: false,
    isExpanded: false,
    subMenuIndex: 0,
    subMenuIsDisabled: false,
  },
}

export function ColabProvider({ children }: { children: ReactNode }) {
  // const encodedData = btoa("Hello, world"); // encode a string
  // const decodedData = atob(encodedData); // decode the string
  if (!getLocalStorageSecret(keyLocalStorage))
    setLocalStorageSecret(keyLocalStorage, JSON.stringify(initialState))
  else initialState = JSON.parse(getLocalStorageSecret(keyLocalStorage))

  const [dataColabContext, setDataColabContext] = useState<IColabContext>({
    ...initialState,
  })

  useEffect(() => {}, [])

  function setData(data: IColabContext) {
    setDataColabContext({ ...data })
    setLocalStorageSecret(keyLocalStorage, JSON.stringify(data))
  }

  const memoedValue = useMemo(
    () => ({
      colabProvider: { ...dataColabContext },
      setData,
    }),
    [dataColabContext],
  )

  return (
    <ColabContext.Provider value={memoedValue}>
      {children}
    </ColabContext.Provider>
  )
}

export default function useColabContext() {
  return useContext(ColabContext)
}
