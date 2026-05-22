import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const SHIPPING_THRESHOLD = 75
const SHIPPING_FEE = 5.99

export default function Cart() {
  const navigate = useNavigate()
  const { cart, cartTotal, removeFromCart, updateCartQty } = useApp()

  const shipping = cartTotal >= SHIPPING_THRESHOLD || cartTotal === 0 ? 0 : SHIPPING_FEE
  const total = cartTotal + shipping

  function handleCheckout() {
    if (cart.length === 0) return
    navigate('/checkout/address')
  }

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Shopping Cart</h1>
          <p className="page-desc">
            {cart.length} {cart.length === 1 ? 'product' : 'products'} in your cart
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="empty-page">
            <CartEmptyIcon />
            <h2>Your cart is empty</h2>
            <p>Add items from the shop to get started.</p>
            <Link to="/" className="btn btn--primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <ul className="cart-list">
              {cart.map((item) => (
                <li key={item.id} className="cart-list__item">
                  <img src={item.image} alt={item.name} />
                  <div className="cart-list__info">
                    <h3>{item.name}</h3>
                    <span className="cart-list__price">${item.price.toFixed(2)} each</span>
                    <div className="qty-control">
                      <button
                        type="button"
                        onClick={() => updateCartQty(item.id, item.qty - 1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => updateCartQty(item.id, item.qty + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="cart-list__right">
                    <strong>${(item.price * item.qty).toFixed(2)}</strong>
                    <button
                      type="button"
                      className="cart-list__remove"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="cart-summary">
              <h2>Order Summary</h2>
              <div className="cart-summary__row">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="cart-summary__row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              {cartTotal > 0 && cartTotal < SHIPPING_THRESHOLD && (
                <p className="cart-summary__hint">
                  Add ${(SHIPPING_THRESHOLD - cartTotal).toFixed(2)} more for free shipping
                </p>
              )}
              <div className="cart-summary__total">
                <span>Total</span>
                <strong>${total.toFixed(2)}</strong>
              </div>
              <button type="button" className="btn btn--primary btn--full" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
              <Link to="/" className="cart-summary__link">
                ← Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}

function CartEmptyIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.35">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}
