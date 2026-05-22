import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const STEPS = [
  { key: 'pending', label: 'Pending', desc: 'Order received and being prepared' },
  { key: 'shipped', label: 'Shipped', desc: 'On the way to your address' },
  { key: 'delivered', label: 'Delivered', desc: 'Successfully delivered' },
]

export default function OrderStatus() {
  const { currentOrder, updateOrderStatus } = useApp()

  if (!currentOrder) {
    return (
      <div className="page">
        <div className="container empty-page">
          <h2>No active order</h2>
          <p>Place an order to track it here.</p>
          <Link to="/" className="btn btn--primary">
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  const statusIndex = STEPS.findIndex((s) => s.key === currentOrder.status)
  const placedDate = new Date(currentOrder.placedAt).toLocaleString()

  return (
    <div className="page order-status-page">
      <div className="container">
        <div className="order-hero">
          <div className="order-hero__badge">Order Placed</div>
          <h1 className="page-title">Track Your Order</h1>
          <p className="order-hero__id">
            Order ID: <code>{currentOrder.id}</code>
          </p>
          <p className="page-desc">Placed on {placedDate}</p>
        </div>

        <div className="order-grid">
          <section className="order-stepper-card">
            <h2>Delivery Progress</h2>
            <div className="order-stepper">
              {STEPS.map((step, index) => {
                const isComplete = index < statusIndex
                const isActive = index === statusIndex
                const isUpcoming = index > statusIndex

                return (
                  <div
                    key={step.key}
                    className={`order-step ${isComplete ? 'order-step--complete' : ''} ${isActive ? 'order-step--active' : ''} ${isUpcoming ? 'order-step--upcoming' : ''}`}
                  >
                    <div className="order-step__indicator">
                      <span className="order-step__dot">
                        {isComplete ? <CheckIcon /> : index + 1}
                      </span>
                      {index < STEPS.length - 1 && <span className="order-step__line" />}
                    </div>
                    <div className="order-step__content">
                      <h3>{step.label}</h3>
                      <p>{step.desc}</p>
                      {isActive && (
                        <span className="order-step__status-pill">Current status</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <aside className="order-summary-card">
            <h2>Order Summary</h2>
            <div className="order-summary-card__row">
              <span>Status</span>
              <span className={`status-badge status-badge--${currentOrder.status}`}>
                {currentOrder.status}
              </span>
            </div>
            <div className="order-summary-card__row">
              <span>Payment</span>
              <span>{currentOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card'}</span>
            </div>
            <div className="order-summary-card__row">
              <span>Total</span>
              <strong>${currentOrder.total.toFixed(2)}</strong>
            </div>

            <h3>Items</h3>
            <ul className="order-items-list">
              {currentOrder.items.map((item) => (
                <li key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <span>{item.name}</span>
                    <small>Qty: {item.qty} × ${item.price.toFixed(2)}</small>
                  </div>
                </li>
              ))}
            </ul>

            {currentOrder.address && (
              <>
                <h3>Shipping Address</h3>
                <p className="order-address">
                  {currentOrder.address.name}
                  <br />
                  {currentOrder.address.address}, {currentOrder.address.city}
                  <br />
                  {currentOrder.address.phone}
                </p>
              </>
            )}

            <Link to="/" className="btn btn--primary btn--full" style={{ marginTop: '1.5rem' }}>
              Continue Shopping
            </Link>
          </aside>
        </div>

        <div className="dev-panel">
          <p>
            <strong>Test Panel</strong> — Manually switch order status to preview stepper animations:
          </p>
          <div className="dev-panel__buttons">
            {STEPS.map((step) => (
              <button
                key={step.key}
                type="button"
                className={`btn btn--sm ${currentOrder.status === step.key ? 'btn--primary' : 'btn--ghost'}`}
                onClick={() => updateOrderStatus(step.key)}
              >
                {step.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}
