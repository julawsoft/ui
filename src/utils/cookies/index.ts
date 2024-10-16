import Cookies from 'js-cookie';

export type IUserLogged = {
    name: string
    roles: string[]
    groups: string[]
    isLogged: boolean
    accessToken: string,
    refreshToken: string
}

const setUserLogged = (userLogged: IUserLogged) => {
  Cookies.set('userLogged', JSON.stringify(userLogged), { expires: 1, secure: true, sameSite: 'Strict' });
};

const getUserLogged = (): IUserLogged => {
  const userLogged = Cookies.get('userLogged')
  return userLogged ? JSON.parse(userLogged) : [] as unknown as IUserLogged;
} 

export {
    setUserLogged,
    getUserLogged,
}
