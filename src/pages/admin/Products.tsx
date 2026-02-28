import { Link } from 'react-router-dom'
import { products } from '../../data/mockData'
import './Admin.css'

export default function AdminProducts() {
  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Products Management</h1>
        <div className="admin-actions">
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/orders">Orders</Link>
          <Link to="/admin/users">Users</Link>
          <Link to="/admin/products/add">Add Product</Link>
          <Link to="/">View Store</Link>
        </div>
      </div>

      <div className="container">
        <div className="content-section">
          <h2>All Products</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>₱{product.price.toLocaleString()}</td>
                  <td>{product.stock}</td>
                  <td className="actions">
                    <Link to={`/admin/products/${product.id}`} className="btn btn-sm btn-primary">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
