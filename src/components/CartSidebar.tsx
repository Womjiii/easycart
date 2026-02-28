import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { getCategoryIcon } from '../data/mockData'
import './CartSidebar.css'

export default function CartSidebar() {
  const { items, removeItem, updateQuantity, getTotal } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  // Listen for body class changes to open/close sidebar
  useEffect(() => {
    const checkCartOpen = () => {
      const isCartOpen = document.body.classList.contains('cart-open')
      setIsOpen(isCartOpen)
    }

    // Check initially and set up interval to detect changes
    checkCartOpen();
    const interval = setInterval(checkCartOpen, 100);

    return () => clearInterval(interval);
  }, [])

  const closeCart = () => {
    document.body.classList.remove('cart-open')
    setIsOpen(false)
  }

  const formatPrice = (price: number) => {
    return `₱${price.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  return (
    <>
      {isOpen && <div className="cart-overlay" onClick={closeCart}></div>}
      <div className={`cart-sidebar ${isOpen ? 'active' : ''}`}>
        <div className="cart-sidebar-header">
          <h3>Shopping Cart</h3>
          <button className="cart-sidebar-close" onClick={closeCart}>×</button>
        </div>
        
        <div className="cart-sidebar-content">
          {items.length === 0 ? (
            <div className="cart-empty">
              <h4>Your cart is empty</h4>
              <p>Start shopping for electrical equipment and tools!</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  {getCategoryIcon(item.product.category)}
                </div>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.product.name}</div>
                  <div className="cart-item-price">{formatPrice(item.product.price)}</div>
                  <div className="cart-item-quantity">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <button 
                  className="cart-item-remove" 
                  onClick={() => removeItem(item.product.id)}
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
        
        {items.length > 0 && (
          <div className="cart-sidebar-footer">
            <div className="cart-total">
              <span>Total</span>
              <span>{formatPrice(getTotal())}</span>
            </div>
            <Link to="/checkout" className="cart-checkout-btn" onClick={closeCart}>
              Proceed to Checkout
            </Link>
            <Link to="/cart" className="cart-view-btn" onClick={closeCart}>
              View Cart
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
