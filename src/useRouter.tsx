import { Suspense, lazy, useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { AppContext } from './context/app.context'
import MainLayout from './layout/MainLayout'
import UserLayout from './layout/UserLayout'

const Login = lazy(() => import('./pages/Login'))
const Main = lazy(() => import('./pages/Main'))
const Profile = lazy(() => import('./pages/User/Profile'))
const Register = lazy(() => import('./pages/Register'))
const Detail = lazy(() => import('./pages/Detail'))
const Cart = lazy(() => import('./pages/Cart'))
const History = lazy(() => import('./pages/User/History'))
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
          <Suspense>
            <Main />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '/:id',
      element: (
        <MainLayout>
          <Suspense>
            <Detail />
          </Suspense>
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
              <Suspense>
                <Cart />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: '/profile',
          element: (
            <MainLayout>
              <UserLayout>
                <Suspense>
                  <Profile />
                </Suspense>
              </UserLayout>
            </MainLayout>
          )
        },

        {
          path: '/history',
          element: (
            <MainLayout>
              <UserLayout>
                <Suspense>
                  <History />
                </Suspense>
              </UserLayout>
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
              <Suspense>
                <Login />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: '/register',
          element: (
            <MainLayout>
              <Suspense>
                <Register />
              </Suspense>
            </MainLayout>
          )
        }
      ]
    }
  ])

  return routerElement
}
