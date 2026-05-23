import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import LoadingSpinner from '../ui/LoadingSpinner'

const StaffLayout = () => {
  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-[#0f1416] xl:flex-row">
      <Sidebar />
      <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
          <Suspense fallback={<LoadingSpinner label="Waxaa la soo rarayaa..." />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  )
}

export default StaffLayout
