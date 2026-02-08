import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const userData = localStorage.getItem('userData')
    if (token && userData) {
      setIsAuthenticated(true)
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      setLoading(true)
      
      // Simulate API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock authentication
      if (email && password) {
        const mockToken = 'mock-jwt-token-' + Date.now()
        const mockUser = {
          id: 1,
          email: email,
          name: email.split('@')[0],
        }
        
        localStorage.setItem('authToken', mockToken)
        localStorage.setItem('userData', JSON.stringify(mockUser))
        
        setIsAuthenticated(true)
        setUser(mockUser)
        
        toast.success('Login successful!')
        return { success: true }
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      toast.error(error.message || 'Login failed')
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    localStorage.removeItem('cart')
    setIsAuthenticated(false)
    setUser(null)
    toast.success('Logged out successfully')
  }

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
