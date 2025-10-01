import Cookies from 'js-cookie';

export type IUserLogged = {
    name: string
    roles: string[]
    groups: string
    isLogged: boolean
    accessToken: string,
    refreshToken: string
}

const setUserLogged = (userLogged: IUserLogged) => {
  console.log("o cookies set ", userLogged)
  localStorage.setItem('userLogged', JSON.stringify(userLogged));
  // Cookies.set('userLogged', JSON.stringify(userLogged), { expires: 1, secure: window.location.protocol === "https:", sameSite: 'Strict' });
};

const getUserLogged = (): IUserLogged => {
 // const userLogged = Cookies.get('userLogged')
  const userLogged = localStorage.getItem('userLogged')
  console.log("o cookies ", userLogged)
  return userLogged ? JSON.parse(userLogged) : [] as unknown as IUserLogged;
} 

export {
    setUserLogged,
    getUserLogged,
}
