import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { products, getCategoryIcon, searchProducts, getProductsByCategory } from '../data/mockData'
import { Product } from '../types'
import './Home.css'

export default function Home() {
  const [searchParams] = useSearchParams()
  const { addItem } = useCart()
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  
  const categoryParam = searchParams.get('category')
  const searchParam = searchParams.get('search')

  useEffect(() => {
    let result: Product[] = []
    
    if (searchParam) {
      result = searchProducts(searchParam)
    } else if (categoryParam) {
      result = getProductsByCategory(categoryParam)
    } else {
      result = products.filter(p => p.stock > 0)
    }
    
    setFilteredProducts(result)
  }, [categoryParam, searchParam])

  const handleAddToCart = (product: Product) => {
    addItem(product, 1)
    alert('Added to cart!')
  }

  const formatPrice = (price: number) => {
    return `₱${price.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Professional Electrical Equipment & Tools</h1>
          <p>Your trusted source for high-quality electrical supplies, power tools, and hardware at competitive prices.</p>
          <Link to="/" className="cta-btn">Shop Now</Link>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="container">
          <div className="products-header">
            <h2>
              {searchParam 
                ? `Search Results for "${searchParam}"` 
                : categoryParam 
                  ? categoryParam 
                  : 'All Products'
              }
            </h2>
            <p className="products-count">{filteredProducts.length} products found</p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <h3>No products found</h3>
              <p>Try a different search or category</p>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card">
                  <Link to={`/product/${product.id}`} className="product-link">
                    <div className="product-image">
                      <span className="product-icon">{getCategoryIcon(product.category)}</span>
                    </div>
                    <div className="product-info">
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-category">{product.category}</p>
                      <div className="product-price">{formatPrice(product.price)}</div>
                    </div>
                  </Link>
                  <button 
                    className="add-to-cart-btn"
                    onClick={(e) => {
                      e.preventDefault()
                      handleAddToCart(product)
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
