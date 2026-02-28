import { Link } from 'react-router-dom'
import { products, orders, users } from '../../data/mockData'
import './Admin.css'

export default function AdminDashboard() {
  const totalProducts = products.length
  const totalOrders = orders.length
  const totalUsers = users.filter(u => u.role === 'customer').length
  const totalRevenue = orders.reduce((sum, o) => sum + o.total_amount, 0)

  const stats = [
    { label: 'Total Customers', value: totalUsers, icon: '👥' },
    { label: 'Total Products', value: totalProducts, icon: '📦' },
    { label: 'Total Orders', value: totalOrders, icon: '📋' },
    { label: 'Total Revenue', value: `₱${totalRevenue.toLocaleString()}`, icon: '💰' },
  ]

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-actions">
          <Link to="/admin/products">Products</Link>
          <Link to="/admin/orders">Orders</Link>
          <Link to="/admin/users">Users</Link>
          <Link to="/">View Store</Link>
        </div>
      </div>

      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="content-section">
          <h2>Recent Orders</h2>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.user?.name || 'Unknown'}</td>
                  <td>{new Date(order.order_date).toLocaleDateString()}</td>
                  <td>₱{order.total_amount.toLocaleString()}</td>
                  <td>
                    <span className={`badge badge-${order.status}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <Link to={`/admin/orders/${order.id}`} className="btn btn-sm btn-primary">
                      View
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
