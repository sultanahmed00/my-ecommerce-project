import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const SHIPPING_THRESHOLD = 75
const SHIPPING_FEE = 5.99

export default function Payment() {
  const navigate = useNavigate()
  const { cart, cartTotal, shippingAddress, placeOrder } = useApp()
  const [method, setMethod] = useState('cod')

  const shipping = cartTotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  const total = cartTotal + shipping

  function handlePlaceOrder() {
    if (!shippingAddress || cart.length === 0) return
    const order = placeOrder({ paymentMethod: method, total })
    navigate('/order', { state: { orderId: order.id } })
  }

  if (!shippingAddress) {
    return (
      <div className="page">
        <div className="container empty-page">
          <h2>Please add a shipping address first</h2>
          <Link to="/checkout/address" className="btn btn--primary">
            Add Address
          </Link>
        </div>
      </div>
    )
  }

  useEffect(() => {
    if (!shippingAddress) return
    if (cart.length === 0) navigate('/order', { replace: true })
  }, [cart.length, shippingAddress, navigate])

  if (cart.length === 0) {
    return null
  }

  return (
    <div className="page">
      <div className="container checkout-container">
        <div className="checkout-steps">
          <span className="checkout-step checkout-step--done">Cart</span>
          <span className="checkout-step checkout-step--done">Address</span>
          <span className="checkout-step checkout-step--active">Payment</span>
          <span className="checkout-step">Confirm</span>
        </div>

        <div className="checkout-grid">
          <div className="checkout-card">
            <h1 className="page-title">Payment Method</h1>
            <p className="page-desc">Choose how you would like to pay</p>

            <div className="payment-options">
              <label className={`payment-option ${method === 'cod' ? 'payment-option--selected' : ''}`}>
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={method === 'cod'}
                  onChange={() => setMethod('cod')}
                />
                <div className="payment-option__icon">💵</div>
                <div>
                  <strong>Cash on Delivery</strong>
                  <span>Pay when your order arrives</span>
                </div>
              </label>

              <label className={`payment-option ${method === 'card' ? 'payment-option--selected' : ''}`}>
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={method === 'card'}
                  onChange={() => setMethod('card')}
                />
                <div className="payment-option__icon">💳</div>
                <div>
                  <strong>Credit / Debit Card</strong>
                  <span>Secure simulated payment</span>
                </div>
              </label>
            </div>

            <div className="form-actions">
              <Link to="/checkout/address" className="btn btn--ghost">
                ← Back to Address
              </Link>
              <button type="button" className="btn btn--primary" onClick={handlePlaceOrder}>
                Place Order — ${total.toFixed(2)}
              </button>
            </div>
          </div>

          <aside className="checkout-sidebar">
            <h3>Deliver to</h3>
            <p>
              <strong>{shippingAddress.name}</strong>
              <br />
              {shippingAddress.address}
              <br />
              {shippingAddress.city}
              <br />
              {shippingAddress.phone}
            </p>
            <hr />
            <div className="cart-summary__row">
              <span>Items ({cart.length})</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="cart-summary__row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="cart-summary__total">
              <span>Total</span>
              <strong>${total.toFixed(2)}</strong>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
