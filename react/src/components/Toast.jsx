import React from 'react'
import { useStateContext } from '../Context/ContextProvider'

export default function Toast() {
  const { toast, setToast } = useStateContext()

  return (
    toast.show && (
      <div className="fixed z-50 px-3 py-2 text-white rounded  bg-emerald-500 right-2 bottom-2">
        {toast.message}
      </div>
    )
  )
}
