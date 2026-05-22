export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__content container">
        <p className="hero__eyebrow">Spring Collection 2026</p>
        <h1 className="hero__title">
          Curated goods for
          <em> everyday living</em>
        </h1>
        <p className="hero__desc">
          Discover premium products across electronics, fashion, home, and beauty — shipped free on orders over $75.
        </p>
        <div className="hero__cta">
          <a href="#shop" className="btn btn--primary">
            Shop Now
          </a>
          <a href="#deals" className="btn btn--ghost">
            View Deals
          </a>
        </div>
        <div className="hero__stats">
          <div>
            <strong>2,400+</strong>
            <span>Products</span>
          </div>
          <div>
            <strong>50k+</strong>
            <span>Happy Customers</span>
          </div>
          <div>
            <strong>4.9</strong>
            <span>Average Rating</span>
          </div>
        </div>
      </div>
      <div className="hero__visual">
        <div className="hero__card hero__card--main">
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=600&fit=crop"
            alt="Featured product"
          />
          <div className="hero__card-label">
            <span>New Arrival</span>
            <strong>From $64</strong>
          </div>
        </div>
        <div className="hero__card hero__card--float">
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop"
            alt="Headphones"
          />
        </div>
      </div>
    </section>
  )
}
