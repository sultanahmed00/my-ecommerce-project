import { useApp } from '../context/AppContext'

export default function ProductCard({ product, onAddToCart }) {
  const { isInWishlist, toggleWishlist } = useApp()
  const wished = isInWishlist(product.id)

  return (
    <article className="product-card">
      <div className="product-card__image-wrap">
        {product.badge && (
          <span
            className={`product-card__badge product-card__badge--${product.badge.toLowerCase().replace(' ', '-')}`}
          >
            {product.badge}
          </span>
        )}
        <button
          type="button"
          className={`product-card__wishlist ${wished ? 'product-card__wishlist--active' : ''}`}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={() => toggleWishlist(product)}
        >
          <HeartIcon filled={wished} />
        </button>
        <img src={product.image} alt={product.name} className="product-card__image" loading="lazy" />
        <button type="button" className="product-card__quick-add" onClick={() => onAddToCart(product)}>
          Quick Add
        </button>
      </div>
      <div className="product-card__body">
        <div className="product-card__meta">
          <span className="product-card__category">{product.category}</span>
          <span className="product-card__rating">
            <StarIcon />
            {product.rating}
          </span>
        </div>
        <h3 className="product-card__name">{product.name}</h3>
        <div className="product-card__footer">
          <span className="product-card__price">${product.price.toFixed(2)}</span>
          <button type="button" className="btn btn--sm" onClick={() => onAddToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  )
}

function HeartIcon({ filled }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}
