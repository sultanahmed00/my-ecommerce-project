import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const emptyForm = { name: '', phone: '', address: '', city: '' }

export default function Address() {
  const navigate = useNavigate()
  const { shippingAddress, setShippingAddress, cart } = useApp()
  const [form, setForm] = useState(shippingAddress || emptyForm)
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  function validate() {
    const next = {}
    if (!form.name.trim()) next.name = 'Name is required'
    if (!form.phone.trim()) next.phone = 'Phone is required'
    else if (!/^[\d\s+\-()]{7,}$/.test(form.phone.trim()))
      next.phone = 'Enter a valid phone number'
    if (!form.address.trim()) next.address = 'Address is required'
    if (!form.city.trim()) next.city = 'City is required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setShippingAddress({
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      city: form.city.trim(),
    })
    navigate('/checkout/payment')
  }

  if (cart.length === 0) {
    return (
      <div className="page">
        <div className="container empty-page">
          <h2>Your cart is empty</h2>
          <Link to="/" className="btn btn--primary">
            Go to Shop
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="container checkout-container">
        <div className="checkout-steps">
          <span className="checkout-step checkout-step--done">Cart</span>
          <span className="checkout-step checkout-step--active">Address</span>
          <span className="checkout-step">Payment</span>
          <span className="checkout-step">Confirm</span>
        </div>

        <div className="checkout-card">
          <h1 className="page-title">Shipping Address</h1>
          <p className="page-desc">Where should we deliver your order?</p>

          <form className="address-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={errors.name ? 'input--error' : ''}
              />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+1 555 123 4567"
                className={errors.phone ? 'input--error' : ''}
              />
              {errors.phone && <span className="form-error">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="address">Street Address</label>
              <input
                id="address"
                name="address"
                type="text"
                value={form.address}
                onChange={handleChange}
                placeholder="123 Main Street, Apt 4B"
                className={errors.address ? 'input--error' : ''}
              />
              {errors.address && <span className="form-error">{errors.address}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                type="text"
                value={form.city}
                onChange={handleChange}
                placeholder="New York"
                className={errors.city ? 'input--error' : ''}
              />
              {errors.city && <span className="form-error">{errors.city}</span>}
            </div>

            <div className="form-actions">
              <Link to="/cart" className="btn btn--ghost">
                ← Back to Cart
              </Link>
              <button type="submit" className="btn btn--primary">
                Continue to Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
