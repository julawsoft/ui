import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import { ROUTES_PATH } from './routePaths'
import AppLayout from '../components/AppLayout'
import { routesPermissions } from './routersPermission'
import { getUserLogged, IUserLogged } from '../utils/cookies'
import useAuthStore from '../context/authStore'
import NotFound from '../pages/NotFound'
import Loader from '../pages/Loader'

export default function Router() {

    const setUser = useAuthStore((state) => state.setUser)

    const [loading, setLoading] = useState(true)
    const userLogged: IUserLogged = getUserLogged()

    const [isDrawerOpen, setDrawerOpen] = useState(true);
    const handleDrawerToggle = () => {
        setDrawerOpen(prev => !prev);
    };

    useEffect(() => {
        if (userLogged.isLogged) {
            setUser({
                id: String(userLogged.id),
                name: userLogged.name,
                email: '',
                groups: userLogged.groups,
                roles: userLogged.roles,
                isLogged: userLogged.isLogged,
                accessToken: userLogged.accessToken,
                refreshToken: userLogged.refreshToken
            })
        }
        setLoading(false)   
    }, [])

    const ProtectedRoute = ({ children }: any) => {
        console.log("  userLogged  >>> ", userLogged)
        if (!userLogged?.isLogged) {
            return <Navigate to={ROUTES_PATH.Login} replace />
        }
        return children
    }

    const PublicRoute = ({ children }: any) => {
        if (loading) return <>Loading...</> // espera o estado do usuário carregar
        if (userLogged?.isLogged) return <Navigate to="/" replace /> // já logado, redireciona
        return children
    }
    // Verificação de permissões
    const hasPermission = (itemRoles: string[]) => {
        if (!userLogged || !userLogged.groups) return false
        return itemRoles.some(role =>
            userLogged.groups.toString().toLowerCase().includes(role.toLowerCase())
        )
    }

    if(loading
    ) return (
        <><Loader/></>
    )

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <AppLayout isDrawerOpen={isDrawerOpen} onDrawerToggle={handleDrawerToggle} />
                    </ProtectedRoute>
                }
            >
                {routesPermissions.map((route) => {
                    const canAccess = hasPermission(route.roles)

                    return (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={canAccess ? route.element : <>User Without Permission</>}
                        >
                            {route.subRoute}
                        </Route>
                    )
                })}
            </Route>

            <Route 
            path={ROUTES_PATH.Login}
             element={
                <PublicRoute>
                    <Login />
                </PublicRoute>
            }/>
            <Route path="/*" element={<NotFound />} />
        </Routes>
    )
}
