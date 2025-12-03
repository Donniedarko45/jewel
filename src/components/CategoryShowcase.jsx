import './CategoryShowcase.css';

const CategoryShowcase = ({ onNavigate }) => {
  const categories = [
    {
      id: 1,
      name: 'Ring',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&q=80',
    },
    {
      id: 2,
      name: 'Necklace',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&q=80',
    },
    {
      id: 3,
      name: 'Bracelet',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&q=80',
    }
  ];

  return (
    <section className="category-showcase">
      <div className="category-container">
        <div className="category-layout">
          <div className="category-left-image">
            <img
              src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80"
              alt="Hand with jewelry"
            />
            <button className="play-btn">▶</button>
          </div>

          <div className="category-content">
            <h2 className="category-heading">Choose The Type!</h2>
            <p className="category-desc">
            Discover our diverse collection of jewelry, each piece crafted to stay radiant, always.
            </p>

            <div className="category-circles">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="category-circle-item"
                  onClick={() => onNavigate('products')}
                >
                  <div className="circle-image">
                    <img src={category.image} alt={category.name} />
                  </div>
                  <span className="circle-name">{category.name}</span>
                  <button className="circle-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5v14M19 12l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
