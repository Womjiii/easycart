import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>⚡ EasyCart</h3>
          <p>Your trusted source for professional electrical equipment, power tools, and hardware supplies.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/?category=Electrical Equipment">Electrical Equipment</Link>
          <Link to="/?category=Power Tools">Power Tools</Link>
          <Link to="/?category=Hand Tools">Hand Tools</Link>
        </div>
        
        <div className="footer-section">
          <h4>Customer Service</h4>
          <Link to="/contact">Contact Us</Link>
          <Link to="/about">About Us</Link>
          <Link to="/terms">Terms & Conditions</Link>
        </div>
        
        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>📍 Manila, Philippines</p>
          <p>📞 +63 912 345 6789</p>
          <p>✉️ support@easycart.com</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} EasyCart. All rights reserved.</p>
      </div>
    </footer>
  )
}
