export default function CartDrawer({ isOpen, items, onClose, onRemove, onUpdateQty }) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'cart-overlay--visible' : ''}`} onClick={onClose} />
      <aside className={`cart-drawer ${isOpen ? 'cart-drawer--open' : ''}`} aria-hidden={!isOpen}>
        <div className="cart-drawer__header">
          <h2>Your Cart</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close cart">
            <CloseIcon />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-drawer__empty">
            <CartEmptyIcon />
            <p>Your cart is empty</p>
            <button type="button" className="btn btn--primary" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <ul className="cart-drawer__items">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item__info">
                    <h4>{item.name}</h4>
                    <span className="cart-item__price">${item.price.toFixed(2)}</span>
                    <div className="cart-item__qty">
                      <button type="button" onClick={() => onUpdateQty(item.id, item.qty - 1)} aria-label="Decrease quantity">
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button type="button" onClick={() => onUpdateQty(item.id, item.qty + 1)} aria-label="Increase quantity">
                        +
                      </button>
                    </div>
                  </div>
                  <button type="button" className="cart-item__remove" onClick={() => onRemove(item.id)} aria-label="Remove item">
                    <CloseIcon />
                  </button>
                </li>
              ))}
            </ul>
            <div className="cart-drawer__footer">
              <div className="cart-drawer__row">
                <span>Subtotal</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>
              <p className="cart-drawer__note">Shipping calculated at checkout</p>
              <button type="button" className="btn btn--primary btn--full">
                Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

function CartEmptyIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}
