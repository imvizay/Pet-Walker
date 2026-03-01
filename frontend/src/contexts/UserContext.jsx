import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"))
    if (u) {
      setUser(u)
    }
    setLoading(false)
  }, [])

  const saveUser = () => {
    const u = JSON.parse(localStorage.getItem("user"))
    if (!u) return
    setUser(u)
  }

  const logoutUser = () => {
    localStorage.removeItem("user")
    setUser(null)
    navigate("/")
  }

  return (
    <UserContext.Provider value={{ user, loading, saveUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext)
}