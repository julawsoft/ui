import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import { ROUTES_PATH } from './routePaths'
import AppLayout from '../components/AppLayout'
import { routesPermissions } from './routersPermission'
import { getUserLogged } from '../utils/cookies'


export default function Router() {

    const ProtectedRoute = ({ isLogged, children }: any) => {
        if (!isLogged) {
            return <Navigate to={ROUTES_PATH.Login} replace />
        }
        return children
    }

    const userLogged = getUserLogged()

    console.log("routas user logged", userLogged)


    const [isDrawerOpen, setDrawerOpen] = useState(true);
    const userProfile: 'Admin' | 'Editor' | 'Viewer' = 'Admin'; // Defina o perfil do usuário aqui

    const userPermissions = {
        name: "",
        profile: 'Admin',
        isLogged: true,
    }

    const handleDrawerToggle = () => {
        setDrawerOpen(prev => !prev);
    };

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoute isLogged={userLogged !== undefined}>
                        <AppLayout userProfile={userProfile} isDrawerOpen={isDrawerOpen} onDrawerToggle={handleDrawerToggle} />
                    </ProtectedRoute>
                }>

                {routesPermissions.map((route) => {
                    if (
                        route.roles?.includes(userPermissions.profile) ||
                        !route.roles ||
                        route.roles.length === 0
                    )
                        return (
                            <Route key={route.path} path={route.path} element={route.element}>
                                {route.subRoute}
                            </Route>
                        )

                    return (
                        <Route key={route.path} path={route.path} element={<>PERMITION </>}>
                            {route.subRoute}
                        </Route>
                    )
                })}

            </Route>
            <Route path={ROUTES_PATH.Login} element={<Login />} />
        </Routes>
    )
}