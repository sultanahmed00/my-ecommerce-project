import { Link, NavLink } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Header() {
  const { cartCount, wishlist } = useApp()

  return (
    <header className="header">
      <div className="header__inner container">
        <Link to="/" className="logo">
          <span className="logo__mark">S</span>
          <span className="logo__text">ShopFlow</span>
        </Link>

        <nav className="nav" aria-label="Main navigation">
          <NavLink to="/" end>
            Shop
          </NavLink>
          <a href="/#shop">Categories</a>
          <a href="/#deals">Deals</a>
          <NavLink to="/wishlist">Wishlist</NavLink>
        </nav>

        <div className="header__actions">
          <NavLink to="/wishlist" className="icon-btn" aria-label="Wishlist">
            <HeartIcon />
            {wishlist.length > 0 && (
              <span className="cart-btn__badge">{wishlist.length}</span>
            )}
          </NavLink>
          <NavLink to="/cart" className="icon-btn cart-btn" aria-label={`Cart, ${cartCount} items`}>
            <CartIcon />
            {cartCount > 0 && <span className="cart-btn__badge">{cartCount}</span>}
          </NavLink>
        </div>
      </div>
    </header>
  )
}

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}
