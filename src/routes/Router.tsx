import { useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Login from '../pages/Login'
import { ROUTES_PATH } from './routePaths'
import AppLayout from '../components/AppLayout'
import { routesPermissions } from './routersPermission'
import { getUserLogged, IUserLogged, setUserLogged } from '../utils/cookies'


export default function Router() {

    setUserLogged({
        name: '',
        groups: [],
        roles: [],
        accessToken: '',
        refreshToken: '',
        isLogged: false
    })

    const ProtectedRoute = ({ isLogged, children }: any) => {
        if (!isLogged) {
            return <Navigate to={ROUTES_PATH.Login} replace />
        }
        return children
    }

    const userLogged:IUserLogged = getUserLogged()

    const [isDrawerOpen, setDrawerOpen] = useState(true);

    const handleDrawerToggle = () => {
        setDrawerOpen(prev => !prev);
    };

    const hasPermission = (itemRoles: string[]) => {
        return itemRoles.some(role => userLogged.groups.includes(role));
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