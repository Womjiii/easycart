import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="profile-page">
      <div className="container">
        <h1>My Profile</h1>
        
        <div className="profile-card">
          <div className="profile-info">
            <h2>Account Details</h2>
            <div className="info-row">
              <span className="label">Name:</span>
              <span className="value">{user.name}</span>
            </div>
            <div className="info-row">
              <span className="label">Email:</span>
              <span className="value">{user.email}</span>
            </div>
            <div className="info-row">
              <span className="label">Phone:</span>
              <span className="value">{user.phone || 'Not provided'}</span>
            </div>
            <div className="info-row">
              <span className="label">Address:</span>
              <span className="value">{user.address || 'Not provided'}</span>
            </div>
            <div className="info-row">
              <span className="label">Role:</span>
              <span className="value">{user.role}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
