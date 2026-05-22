import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useApp()

  function moveToCart(product) {
    addToCart(product)
    removeFromWishlist(product.id)
  }

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">My Wishlist</h1>
          <p className="page-desc">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="empty-page">
            <HeartEmptyIcon />
            <h2>Your wishlist is empty</h2>
            <p>Save products you love and come back anytime.</p>
            <Link to="/" className="btn btn--primary">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map((product) => (
              <article key={product.id} className="wishlist-card">
                <img src={product.image} alt={product.name} />
                <div className="wishlist-card__body">
                  <span className="wishlist-card__category">{product.category}</span>
                  <h3>{product.name}</h3>
                  <p className="wishlist-card__price">${product.price.toFixed(2)}</p>
                  <div className="wishlist-card__actions">
                    <button
                      type="button"
                      className="btn btn--primary"
                      onClick={() => moveToCart(product)}
                    >
                      Move to Cart
                    </button>
                    <button
                      type="button"
                      className="btn btn--ghost"
                      onClick={() => removeFromWishlist(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function HeartEmptyIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.35">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}
