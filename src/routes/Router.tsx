import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import { ROUTES_PATH } from './routePaths'
import AppLayout from '../components/AppLayout'
import { routesPermissions } from './routersPermission'
import { getUserLogged, IUserLogged } from '../utils/cookies'
import useAuthStore from '../context/authStore'
import NotFound from '../pages/NotFound'

export default function Router() {

    const setUser = useAuthStore((state) => state.setUser)
    const userLogged: IUserLogged = getUserLogged()
    
    setUser(
        {
            id: String(userLogged.id),
            name: userLogged.name,
            email: '',
            groups: userLogged.groups[0],
            roles: userLogged.roles,
            isLogged: userLogged.isLogged,
            accessToken: userLogged.accessToken,
            refreshToken: userLogged.refreshToken
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
            return itemRoles.map(role => userLogged.groups.some(group => role.includes(group)));
        else
            return false;
    };

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoute isLogged={userLogged !== undefined}>
                        <AppLayout isDrawerOpen={isDrawerOpen} onDrawerToggle={handleDrawerToggle} />
                    </ProtectedRoute>
                }>

                {routesPermissions.map((route) => {
                    if (
                        hasPermission(route.roles)
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
            <Route path="/*" element={<NotFound />} />
        </Routes>
    )
}