import './FeaturedProducts.css';

const FeaturedProducts = ({ onProductClick }) => {
  const products = [
    {
      id: 1,
      title: 'Diamond Solitaire Ring',
      price: '$2,499',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=500&q=80'
    },
    {
      id: 2,
      title: 'Pearl Drop Earrings',
      price: '$899',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=500&q=80'
    },
    {
      id: 3,
      title: 'Gold Chain Necklace',
      price: '$1,299',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80'
    },
    {
      id: 4,
      title: 'Emerald Bracelet',
      price: '$3,199',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&q=80'
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
        <h2 className="featured-heading">New Arrivals</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => handleProductClick(product)}
            >
              <div className="product-image">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.title}</h3>
                <p className="product-price">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
