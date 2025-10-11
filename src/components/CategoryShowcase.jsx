import './CategoryShowcase.css';

const CategoryShowcase = ({ onNavigate }) => {
  const categories = [
    {
      id: 1,
      name: 'Rings',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
      count: '150+ Designs'
    },
    {
      id: 2,
      name: 'Necklaces',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80',
      count: '200+ Designs'
    },
    {
      id: 3,
      name: 'Earrings',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
      count: '180+ Designs'
    },
    {
      id: 4,
      name: 'Bracelets',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
      count: '120+ Designs'
    }
  ];

  return (
    <section className="category-showcase">
      <div className="category-container">
        <h2 className="category-heading">Shop by Category</h2>
        <p className="category-subtitle">Discover our curated collections</p>
        
        <div className="category-grid">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="category-card"
              onClick={() => onNavigate('products')}
            >
              <div className="category-image">
                <img src={category.image} alt={category.name} />
                <div className="category-overlay">
                  <span className="category-count">{category.count}</span>
                </div>
              </div>
              <h3 className="category-name">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
