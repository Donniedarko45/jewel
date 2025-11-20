import './FeaturedProducts.css';

import braceletImage from '../assets/bracelete.png';
import pendantImage from '../assets/pendant.png';

const FeaturedProducts = ({ onProductClick }) => {
  const products = [
    {
      id: 1,
      title: 'Bracelet',
      price: '$240.00',
      image: braceletImage,
    },
    {
      id: 2,
      title: 'Pendant',
      price: '$240.00',
      image: pendantImage,
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
                  <button className="wishlist-btn" onClick={(e) => e.stopPropagation()}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
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
