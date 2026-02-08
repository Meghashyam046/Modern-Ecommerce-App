import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, ShoppingCart, Package, LogOut, Menu, X } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { path: '/items', label: 'Products', icon: ShoppingBag },
    { path: '/cart', label: 'Cart', icon: ShoppingCart },
    { path: '/orders', label: 'Orders', icon: Package },
  ]

  const handleLogout = () => {
    logout()
    navigate('/login')
    setMobileMenuOpen(false)
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container-bordered">
        <div className="flex items-center justify-between h-16">
          <Link to="/items" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ShopHub</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive(path)
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="text-sm text-gray-600">
              Welcome, <span className="font-semibold text-gray-900">{user?.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-gray-200 bg-white"
        >
          <div className="container-bordered py-4 space-y-2">
            <div className="px-4 py-2 text-sm text-gray-600">
              Welcome, <span className="font-semibold text-gray-900">{user?.name}</span>
            </div>
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                  isActive(path)
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  )
}

export default Navbar
