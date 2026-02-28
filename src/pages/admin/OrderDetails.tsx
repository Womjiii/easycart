import { useParams, Link } from 'react-router-dom'
import { orders } from '../../data/mockData'

export default function OrderDetails() {
  const { id } = useParams<{ id: string }>()
  const order = orders.find(o => o.id === Number(id))

  if (!order) {
    return (
      <div className="admin-page">
        <div className="admin-header">
          <h1>Order Not Found</h1>
          <div className="admin-actions">
            <Link to="/admin/orders">Back to Orders</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Order #{order.id}</h1>
        <div className="admin-actions">
          <Link to="/admin/orders">Back to Orders</Link>
        </div>
      </div>

      <div className="container">
        <div className="content-section">
          <h2>Order Details</h2>
          <div className="order-info">
            <p><strong>Customer:</strong> {order.user?.name}</p>
            <p><strong>Date:</strong> {new Date(order.order_date).toLocaleDateString()}</p>
            <p><strong>Status:</strong> <span className={`badge badge-${order.status}`}>{order.status}</span></p>
            <p><strong>Payment Method:</strong> {order.payment_method}</p>
            <p><strong>Shipping Address:</strong> {order.shipping_address}</p>
          </div>

          <h3>Order Items</h3>
          <p>Total: ₱{order.total_amount.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}
