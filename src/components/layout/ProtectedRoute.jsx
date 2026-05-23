import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import LoadingSpinner from '../ui/LoadingSpinner'

const ProtectedRoute = ({ roles }) => {
  const { isAuthenticated, loading, initialized, user } = useAuth()
  const location = useLocation()

  if (!initialized || loading) {
    return <LoadingSpinner label="Waxaa la hubinayaa galitaankaaga" />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (roles?.length && !roles.includes(user?.role)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
