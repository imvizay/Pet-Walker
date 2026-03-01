import { useUserContext } from "../contexts/UserContext"
import { Navigate } from "react-router-dom"

export default function RoleProtectedRoutes({ allowedRoles, children }) {
  const { user, loading } = useUserContext()

  if (loading) {
    return null   
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />
  }

  const userRoles = user.role || []

  const hasAccess = allowedRoles.some(role =>
    userRoles.includes(role)
  )

  if (!hasAccess) {
    return <Navigate to="/" replace />
  }

  return children
}