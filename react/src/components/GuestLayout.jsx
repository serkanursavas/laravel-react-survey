import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../Context/ContextProvider'

export default function GuestLayout() {
  const { currentUser, userToken } = useStateContext()

  if (userToken) {
    return <Navigate to="/" />
  }

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
        </div>

        <Outlet />
      </div>
    </div>
  )
}
