import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Login from './pages/Login'
import Main from './pages/Main'
import Register from './pages/Register'
import MainLayout from './layout/MainLayout'
import { useContext } from 'react'
import { AppContext } from './context/app.context'
import Detail from './components/Detail'
import Cart from './pages/Cart'

export default function useRouter() {
  function ProtectRoute() {
    const { isAuthentication } = useContext(AppContext)
    return isAuthentication ? <Outlet /> : <Navigate to='/login' />
  }
  function RejectRoute() {
    const { isAuthentication } = useContext(AppContext)
    return !isAuthentication ? <Outlet /> : <Navigate to='/' />
  }
  const routerElement = useRoutes([
    {
      path: '/',
      index: true,
      element: (
        <MainLayout>
          <Main />
        </MainLayout>
      )
    },
    {
      path: '/:id',
      element: (
        <MainLayout>
          <Detail />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectRoute />,
      children: [
        {
          path: '/cart',
          element: (
            <MainLayout>
              <Cart />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '/',
      element: <RejectRoute />,
      children: [
        {
          path: '/login',
          element: (
            <MainLayout>
              <Login />
            </MainLayout>
          )
        },
        {
          path: '/register',
          element: (
            <MainLayout>
              <Register />
            </MainLayout>
          )
        }
      ]
    }
  ])

  return routerElement
}
