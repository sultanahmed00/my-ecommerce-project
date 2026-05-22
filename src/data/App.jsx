import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Wishlist from './pages/Wishlist'
import Cart from './pages/Cart'
import Address from './pages/Address'
import Payment from './pages/Payment'
import OrderStatus from './pages/OrderStatus'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout/address" element={<Address />} />
            <Route path="checkout/payment" element={<Payment />} />
            <Route path="order" element={<OrderStatus />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
