import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { getProductById, getCategoryIcon } from '../data/mockData'

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const product = getProductById(Number(id))

  if (!product) {
    return (
      <div className="product-details-page">
        <div className="container">
          <div className="not-found">
            <h2>Product not found</h2>
            <Link to="/" className="btn btn-primary">Back to Home</Link>
          </div>
        </div>
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return `₱${price.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="product-details-page">
      <div className="container">
        <Link to="/" className="back-link">← Back to Products</Link>

        <div className="product-details">
          <div className="product-image">
            <span className="product-icon">{getCategoryIcon(product.category)}</span>
          </div>

          <div className="product-info">
            <span className="product-category">{product.category}</span>
            <h1>{product.name}</h1>
            <div className="product-price">{formatPrice(product.price)}</div>
            <p className="product-stock">Stock: {product.stock} units</p>
            <p className="product-description">{product.description}</p>

            <div className="add-to-cart-section">
              <div className="quantity-control">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                  min={1}
                  max={product.stock}
                />
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}>+</button>
              </div>

              <button
                className={`add-to-cart-btn ${added ? 'added' : ''}`}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                {added ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
