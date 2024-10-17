import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import { ROUTES_PATH } from './routePaths'
import AppLayout from '../components/AppLayout'
import { routesPermissions } from './routersPermission'
import { getUserLogged, IUserLogged } from '../utils/cookies'
import useAuthStore from '../context/authStore'


export default function Router() {

    const setUser = useAuthStore((state) => state.setUser)

    const userLogged: IUserLogged = getUserLogged()

    setUser(
        {
            ...userLogged,
            id: '',
            email: ''
        }
    )

    const ProtectedRoute = ({ isLogged, children }: any) => {
        if (!isLogged) {
            return <Navigate to={ROUTES_PATH.Login} replace />
        }
        return children
    }

    const [isDrawerOpen, setDrawerOpen] = useState(true);

    const handleDrawerToggle = () => {
        setDrawerOpen(prev => !prev);
    };

    const hasPermission = (itemRoles: string[]) => {
        if (itemRoles)
            return itemRoles.some(role => userLogged.groups.includes(role));
        else
            return false;
    };

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoute isLogged={userLogged !== undefined}>
                        <AppLayout userProfile={userLogged.groups} isDrawerOpen={isDrawerOpen} onDrawerToggle={handleDrawerToggle} />
                    </ProtectedRoute>
                }>

                {routesPermissions.map((route) => {
                    if (
                        hasPermission(userLogged.groups) ||
                        !route.roles ||
                        route.roles.length === 0
                    )
                        return (
                            <Route key={route.path} path={route.path} element={route.element}>
                                {route.subRoute}
                            </Route>
                        )

                    return (
                        <Route key={route.path} path={route.path} element={<>User Without Permission </>}>
                            {route.subRoute}
                        </Route>
                    )
                })}

            </Route>
            <Route path={ROUTES_PATH.Login} element={<Login />} />
        </Routes>
    )
}