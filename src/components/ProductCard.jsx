import { useState } from 'react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product, onProductClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const handleCardClick = () => {
    if (onProductClick) onProductClick(product);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  // Format price — ensure ₹ prefix
  const displayPrice = typeof product.price === 'number'
    ? `₹${product.price.toLocaleString('en-IN')}`
    : product.price?.startsWith('₹') ? product.price : `₹${product.price}`;

  const displayOriginalPrice = product.originalPrice
    ? `₹${product.originalPrice.toLocaleString('en-IN')}`
    : null;

  const isSale = product.isSale || (product.originalPrice && product.originalPrice > product.numericPrice);

  return (
    <div
      className="pcard"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="pcard-img">
        {isSale && <span className="pcard-badge">Sale</span>}
        <img
          src={isHovered && product.secondaryImage ? product.secondaryImage : product.image}
          alt={product.title || product.name}
        />
      </div>
      <div className="pcard-body">
        <h3 className="pcard-name">{product.title || product.name}</h3>
        <div className="pcard-price-row">
          <span className="pcard-price">{displayPrice}</span>
          {displayOriginalPrice && <span className="pcard-original">{displayOriginalPrice}</span>}
        </div>
        <button className="pcard-cart-btn" onClick={handleAddToCart}>Add To Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
