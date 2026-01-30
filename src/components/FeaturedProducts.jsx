import { useNavigate } from 'react-router-dom';
import './FeaturedProducts.css';

const FeaturedProducts = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: 'BRACELETS',
      type: 'bracelet',
      image: 'https://res.cloudinary.com/die8tcfj1/image/upload/v1764785813/1764436168702_kowwaq.jpg',
    },
    {
      id: 2,
      name: 'PENDANTS',
      type: 'pendant',
      image: 'https://res.cloudinary.com/die8tcfj1/image/upload/v1764785960/1764440232861_lrvgt3.png',
    }
  ];

  const handleCategoryClick = (category) => {
    // Navigate to products page - could add category filter in query params later
    navigate('/products');
  };

  return (
    <section className="featured-products">
      <div className="featured-container">
        <h2 className="featured-heading">Our Collection</h2>

        <div className="categories-grid">
          {categories.map((category) => (
            <div
              key={category.id}
              className="category-card"
              onClick={() => handleCategoryClick(category)}
            >
              <div className="category-image">
                <img src={category.image} alt={category.name} />
                {category.discount && (
                  <div className="discount-badge">{category.discount}</div>
                )}
              </div>
              <div className="category-label">
                {category.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
