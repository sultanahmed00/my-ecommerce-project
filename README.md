# ShopFlow — E-Commerce UI

A complete React e-commerce storefront with Context API state management, checkout flow, and order tracking.

## Features

- **Global state** (`src/context/AppContext.js`) — cart (localStorage), wishlist, shipping address, current order
- **Pages** — Home, Wishlist, Cart, Address, Payment, Order Status
- **Checkout flow** — Cart → Address → Payment → Order tracking
- **Order stepper** — Pending → Shipped → Delivered with test panel to switch statuses

## Routes

| Path | Page |
|------|------|
| `/` | Home (product catalog) |
| `/wishlist` | Saved items |
| `/cart` | Shopping cart |
| `/checkout/address` | Shipping form |
| `/checkout/payment` | Payment & place order |
| `/order` | Order tracking |

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Test the Full Flow

1. Add products to cart from the home page
2. Heart icon to add/remove wishlist items
3. Go to **Cart** → adjust quantities → **Proceed to Checkout**
4. Fill **Address** form → **Continue to Payment**
5. Choose COD or Card → **Place Order**
6. On **Order Status**, use the yellow test panel to switch Pending / Shipped / Delivered

## Stack

- React 19 + Vite 6
- React Router 7
- Context API + localStorage persistence

## Live site (GitHub Pages)

**URL:** https://sultanahmed00.github.io/my-ecommerce-project/

After pushing to `main`, enable deployment once:

1. Open **Settings → Pages** on GitHub
2. Under **Build and deployment → Source**, choose **GitHub Actions**
3. Wait 2–3 minutes for the workflow to finish, then hard-refresh the site (Ctrl+F5)
