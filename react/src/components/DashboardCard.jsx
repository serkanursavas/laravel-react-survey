import React from 'react'

export default function DashboardCard({ title, children }) {
  return (
    <div className="flex flex-col p-3 text-center bg-white shadow-md animate-fade-in-down">
      {title && <h3 className="text-2xl font-semibold">{title}</h3>}
      {children}
    </div>
  )
}
