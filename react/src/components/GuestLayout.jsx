import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../Context/ContextProvider'

export default function GuestLayout() {
  const { userToken } = useStateContext()

  if (userToken) {
    return <Navigate to="/" />
  }

  return (
    <div>
      <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="w-auto h-10 mx-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
        </div>

        <Outlet />
      </div>
    </div>
  )
}
