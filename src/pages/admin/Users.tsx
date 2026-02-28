import { Link } from 'react-router-dom'
import { users } from '../../data/mockData'
import './Admin.css'

export default function AdminUsers() {
  const customers = users.filter(u => u.role === 'customer')

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Users Management</h1>
        <div className="admin-actions">
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/products">Products</Link>
          <Link to="/admin/orders">Orders</Link>
          <Link to="/">View Store</Link>
        </div>
      </div>

      <div className="container">
        <div className="content-section">
          <h2>All Customers</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone || 'N/A'}</td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
