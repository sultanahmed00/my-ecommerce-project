import ProductCard from './ProductCard'

export default function ProductGrid({
  products,
  activeCategory,
  onCategoryChange,
  categories,
  onAddToCart,
}) {
  return (
    <section id="shop" className="shop section">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Featured Products</h2>
            <p className="section-desc">Handpicked items our customers love most</p>
          </div>
          <div id="categories" className="category-filters">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`category-btn ${activeCategory === cat.id ? 'category-btn--active' : ''}`}
                onClick={() => onCategoryChange(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>

        {products.length === 0 && (
          <p className="empty-state">No products in this category yet.</p>
        )}
      </div>
    </section>
  )
}
