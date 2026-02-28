import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { getCategoryIcon } from '../data/mockData'
import './Cart.css'

export default function Cart() {
  const { items, removeItem, updateQuantity, getSubtotal, getTax, getTotal } = useCart()

  const formatPrice = (price: number) => {
    return `₱${price.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <h2>Your Cart is Empty</h2>
            <p>Start shopping for electrical equipment and tools!</p>
            <Link to="/" className="btn btn-primary">Continue Shopping</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Shopping Cart</h1>

        <div className="cart-content">
          <div className="cart-items">
            {items.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  {getCategoryIcon(item.product.category)}
                </div>
                <div className="cart-item-info">
                  <h3>{item.product.name}</h3>
                  <p className="cart-item-category">{item.product.category}</p>
                  <div className="cart-item-price">{formatPrice(item.product.price)}</div>
                </div>
                <div className="cart-item-actions">
                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>−</button>
                    <input type="number" value={item.quantity} readOnly min={1} max={item.product.stock} />
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => removeItem(item.product.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
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
            <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>
            <Link to="/" className="continue-btn">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
