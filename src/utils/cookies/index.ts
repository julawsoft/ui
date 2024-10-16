import Cookies from 'js-cookie';

type IUserLogged = {
    name: string
    role: string[]
    groups: string[]
}

const setUserLogged = (userLogged: IUserLogged) => {
  Cookies.set('userLogged', JSON.stringify(userLogged), { expires: 1, secure: true, sameSite: 'Strict' });
};

const getUserLogged = () => {
  const userLogged = Cookies.get('userLogged')
  userLogged ? JSON.parse(userLogged) : undefined;
};

export {
    setUserLogged,
    getUserLogged,
}
