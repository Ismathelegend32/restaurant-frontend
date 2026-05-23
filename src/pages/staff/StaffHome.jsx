import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { roleDashboardPaths } from '../../utils/constants'

const StaffHome = () => {
  const { user } = useAuth()
  const target = roleDashboardPaths[user?.role] || '/'
  return <Navigate to={target} replace />
}

export default StaffHome
