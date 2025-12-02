export type IUserLogged = {
    id: number
    name: string
    roles: string[]
    groups: string
    isLogged: boolean
    accessToken: string
    refreshToken: string
}

const setUserLogged = (userLogged: IUserLogged) => {
  localStorage.setItem('userLogged', JSON.stringify(userLogged));
};

const getUserLogged = (): IUserLogged => {
  const userLogged = localStorage.getItem('userLogged')
  return userLogged ? JSON.parse(userLogged) : [] as unknown as IUserLogged;
} 

export {
    setUserLogged,
    getUserLogged,
}
