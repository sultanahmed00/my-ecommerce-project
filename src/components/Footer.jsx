import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer id="about" className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link to="/" className="logo">
            <span className="logo__mark">S</span>
            <span className="logo__text">ShopFlow</span>
          </Link>
          <p>Quality products, thoughtful design, and fast delivery — every order.</p>
        </div>
        <div>
          <h4>Shop</h4>
          <ul>
            <li><a href="#">New Arrivals</a></li>
            <li><a href="#">Best Sellers</a></li>
            <li><a href="#">Sale</a></li>
            <li><a href="#">Gift Cards</a></li>
          </ul>
        </div>
        <div>
          <h4>Support</h4>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Shipping Info</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4>Newsletter</h4>
          <p>Get 10% off your first order.</p>
          <form className="newsletter" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="your@email.com" aria-label="Email address" />
            <button type="submit" className="btn btn--primary">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="footer__bottom container">
        <p>© 2026 ShopFlow. All rights reserved.</p>
        <div className="footer__links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </div>
    </footer>
  )
}
