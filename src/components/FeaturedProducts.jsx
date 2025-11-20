import './FeaturedProducts.css';

const FeaturedProducts = ({ onProductClick }) => {
  const products = [
    {
      id: 1,
      title: 'Gold Earring',
      price: '$240.00',
      image: 'https://images.unsplash.com/photo-1635767798638-3e2523c96e14?w=500&q=80',
    },
    {
      id: 2,
      title: 'Diamond Ring',
      price: '$240.00',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&q=80',
    },
    {
      id: 3,
      title: 'Gold Necklace',
      price: '$240.00',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80',
    }
  ];

  const handleProductClick = (product) => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  return (
    <section className="featured-products">
      <div className="featured-container">
        <div className="featured-header">
          <div className="header-text">
            <h2 className="featured-heading">Our Collection</h2>
            <p className="featured-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
            <button className="see-more-btn">See More</button>
          </div>

          <div className="products-grid">
            {products.map((product) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => handleProductClick(product)}
              >
                <div className="product-image">
                  <img src={product.image} alt={product.title} />
                  <button className="add-to-cart-btn">👜</button>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.title}</h3>
                  <p className="product-price">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
