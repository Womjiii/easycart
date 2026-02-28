import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import './Navbar.css'

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const { getTotalItems } = useCart()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/?search=${encodeURIComponent(search)}`)
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
    setShowUserMenu(false)
  }

  const cartCount = getTotalItems()

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          ⚡ EasyCart
        </Link>

        <form onSubmit={handleSearch} className="navbar-search">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <div className="navbar-actions">
          <button 
            className="navbar-cart-btn"
            onClick={() => document.body.classList.toggle('cart-open')}
          >
            🛒 Cart ({cartCount})
          </button>

          {isAuthenticated ? (
            <div className="navbar-user">
              <button 
                className="navbar-user-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                👤 {user?.name}
              </button>
              {showUserMenu && (
                <div className="navbar-dropdown">
                  <Link to="/profile" onClick={() => setShowUserMenu(false)}>
                    Profile
                  </Link>
                  {user?.role === 'admin' && (
                    <Link to="/admin" onClick={() => setShowUserMenu(false)}>
                      Admin Dashboard
                    </Link>
                  )}
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="navbar-login-btn">Login</Link>
              <Link to="/register" className="navbar-register-btn">Register</Link>
            </>
          )}
        </div>
      </div>

      <nav className="navbar-nav">
        <div className="navbar-nav-container">
          <Link to="/">Home</Link>
          <Link to="/?category=Electrical Equipment">Electrical Equipment</Link>
          <Link to="/?category=Power Tools">Power Tools</Link>
          <Link to="/?category=Hand Tools">Hand Tools</Link>
          <Link to="/?category=Safety Equipment">Safety Equipment</Link>
          <Link to="/?category=Lighting">Lighting</Link>
          <Link to="/?category=Cables & Wires">Cables & Wires</Link>
        </div>
      </nav>
    </header>
  )
}
