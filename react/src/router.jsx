import { Navigate, createBrowserRouter } from 'react-router-dom'

import Register from './views/Register'
import Login from './views/Login'
import Dashboard from './views/Dashboard'
import Surveys from './views/Surveys'
import GuestLayout from './components/GuestLayout'
import DefaultLayout from './components/DefaultLayout'
import SurveyView from './views/SurveyView'

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/dashboard',
        element: <Navigate to="/" />,
      },
      { path: '/', element: <Dashboard /> },
      { path: '/surveys', element: <Surveys /> },
      { path: '/surveys/create', element: <SurveyView /> },
    ],
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },
])

export default router
