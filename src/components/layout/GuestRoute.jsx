import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { roleDashboardPaths } from '../../utils/constants'
import LoadingSpinner from '../ui/LoadingSpinner'

/** Login / register — haddii hore loo galay, u dir dashboard-ka */
const GuestRoute = () => {
  const { isAuthenticated, initialized, user } = useAuth()
  const location = useLocation()

  if (!initialized) {
    return <LoadingSpinner label="Waxaa la hubinayaa galitaankaaga" />
  }

  if (isAuthenticated && user) {
    const redirectTo =
      location.state?.from || roleDashboardPaths[user.role] || '/'
    return <Navigate to={redirectTo} replace />
  }

  return <Outlet />
}

export default GuestRoute
