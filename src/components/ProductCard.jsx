import { useState } from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onProductClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    // Add to cart logic here
  };

  return (
    <div 
      className="product-card-component"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="product-card-image">
        <img 
          src={isHovered && product.secondaryImage ? product.secondaryImage : product.image} 
          alt={product.title} 
        />
      </div>
      <div className="product-card-info">
        <h3 className="product-card-title">{product.title}</h3>
        <p className="product-card-price">{product.price}</p>
      </div>
      <button className="product-card-button" onClick={handleAddToCart}>
        <span>Add to Cart</span>
      </button>
    </div>
  );
};

export default ProductCard;
