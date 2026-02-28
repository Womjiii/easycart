import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import './Checkout.css'

export default function Checkout() {
  const { user } = useAuth()
  const { items, getSubtotal, getTax, getTotal, clearCart } = useCart()
  
  const [shippingAddress, setShippingAddress] = useState(user?.address || '')
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery')
  const [loading, setLoading] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const formatPrice = (price: number) => {
    return `₱${price.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    clearCart()
    setOrderPlaced(true)
    setLoading(false)
  }

  if (orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="order-success">
            <div className="success-icon">✓</div>
            <h1>Order Placed Successfully!</h1>
            <p>Thank you for your purchase. Your order has been placed and is being processed.</p>
            <p>Order details will be sent to your email.</p>
            <Link to="/" className="btn btn-primary">Continue Shopping</Link>
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <Link to="/" className="btn btn-primary">Continue Shopping</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>

        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="checkout-content">
            <div className="checkout-section">
              <h2>Shipping Information</h2>
              
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={user?.name || ''}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={user?.email || ''}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Shipping Address</label>
                <textarea
                  id="address"
                  className="form-control"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  required
                  rows={3}
                />
              </div>
            </div>

            <div className="checkout-section">
              <h2>Payment Method</h2>
              
              <div className="payment-options">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="Cash on Delivery"
                    checked={paymentMethod === 'Cash on Delivery'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>Cash on Delivery</span>
                </label>
                
                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="Bank Transfer"
                    checked={paymentMethod === 'Bank Transfer'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>Bank Transfer</span>
                </label>
                
                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="GCash"
                    checked={paymentMethod === 'GCash'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>GCash</span>
                </label>
              </div>
            </div>

            <div className="checkout-section">
              <h2>Order Items</h2>
              
              <div className="order-items">
                {items.map(item => (
                  <div key={item.id} className="order-item">
                    <div className="order-item-info">
                      <h4>{item.product.name}</h4>
                      <p>{item.quantity} x {formatPrice(item.product.price)}</p>
                    </div>
                    <div className="order-item-total">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="checkout-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(getSubtotal())}</span>
            </div>
            <div className="summary-row">
              <span>Tax (12%)</span>
              <span>{formatPrice(getTax())}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{formatPrice(getTotal())}</span>
            </div>

            <button type="submit" className="place-order-btn" disabled={loading}>
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
