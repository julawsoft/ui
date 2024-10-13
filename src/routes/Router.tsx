import { Navigate, Route, Routes } from 'react-router-dom'
import { LayoutBase } from '../layout/LayoutBase/index'
import { Login } from '../pages/Login'
import { ResetPassword } from '../pages/ResetPassword'
import { routesPermissions } from './routersPermission'
import useGetUserPermissions from '../hooks/useGetUserPermissions'
import { ROUTES } from './constants'
import { NotFound } from '../pages/NotFound'

export function Router() {
  const userPermissions = useGetUserPermissions()
  const ProtectedRoute = ({ isLogged, children }: any) => {
    if (!isLogged) {
      return <Navigate to={ROUTES.Login} replace />
    }
    return children
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute isLogged={userPermissions.isLogged}>
            <LayoutBase />
          </ProtectedRoute>
        }
      >
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
      <Route path={ROUTES.Login} element={<Login />} />
      <Route
        path={`${ROUTES.ResetPassword}/:token`}
        element={<ResetPassword />}
      />
      <Route path="*" element={<NotFound/>} />
    </Routes>
  )
}
