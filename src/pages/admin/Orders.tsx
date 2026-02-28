import { Link } from 'react-router-dom'
import { orders } from '../../data/mockData'
import './Admin.css'

export default function AdminOrders() {
  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Orders Management</h1>
        <div className="admin-actions">
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/products">Products</Link>
          <Link to="/admin/users">Users</Link>
          <Link to="/">View Store</Link>
        </div>
      </div>

      <div className="container">
        <div className="content-section">
          <h2>All Orders</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
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
                  <td className="actions">
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
