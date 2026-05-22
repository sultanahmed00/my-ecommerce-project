import { useState, useMemo } from 'react'
import Hero from '../components/Hero'
import ProductGrid from '../components/ProductGrid'
import { products, categories } from '../data/products'
import { useApp } from '../context/AppContext'

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all')
  const { addToCart } = useApp()

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return products
    return products.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  return (
    <>
      <Hero />
      <section id="deals" className="promo-banner section">
        <div className="container promo-banner__inner">
          <div>
            <span className="promo-banner__tag">Limited Time</span>
            <h2>Free shipping on orders $75+</h2>
            <p>
              Use code <code>SPRING26</code> at checkout for an extra 15% off.
            </p>
          </div>
          <a href="#shop" className="btn btn--light">
            Shop Deals
          </a>
        </div>
      </section>
      <ProductGrid
        products={filteredProducts}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        categories={categories}
        onAddToCart={addToCart}
      />
    </>
  )
}
