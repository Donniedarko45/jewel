import { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ filters, onFilterChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    material: true,
    priceRange: true
  });

  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    material: []
  });

  const [priceRange, setPriceRange] = useState([0, 5000]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCheckboxChange = (filterType, value) => {
    const updated = selectedFilters[filterType].includes(value)
      ? selectedFilters[filterType].filter(item => item !== value)
      : [...selectedFilters[filterType], value];
    
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: updated
    }));
    
    onFilterChange?.({ ...selectedFilters, [filterType]: updated, priceRange });
  };

  const handlePriceChange = (e) => {
    const newMax = parseInt(e.target.value);
    setPriceRange([0, newMax]);
    onFilterChange?.({ ...selectedFilters, priceRange: [0, newMax] });
  };

  const categories = ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Brooches'];
  const materials = ['Gold', 'Silver', 'Platinum', 'Diamond', 'Pearl', 'Gemstone'];

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Filters</h2>

      <div className="filter-section">
        <button 
          className="filter-header"
          onClick={() => toggleSection('category')}
        >
          <span>Category</span>
          <span className="toggle-icon">{expandedSections.category ? '−' : '+'}</span>
        </button>
        {expandedSections.category && (
          <div className="filter-content">
            {categories.map(cat => (
              <label key={cat} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedFilters.category.includes(cat)}
                  onChange={() => handleCheckboxChange('category', cat)}
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="filter-section">
        <button 
          className="filter-header"
          onClick={() => toggleSection('material')}
        >
          <span>Material</span>
          <span className="toggle-icon">{expandedSections.material ? '−' : '+'}</span>
        </button>
        {expandedSections.material && (
          <div className="filter-content">
            {materials.map(mat => (
              <label key={mat} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedFilters.material.includes(mat)}
                  onChange={() => handleCheckboxChange('material', mat)}
                />
                <span>{mat}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="filter-section">
        <button 
          className="filter-header"
          onClick={() => toggleSection('priceRange')}
        >
          <span>Price Range</span>
          <span className="toggle-icon">{expandedSections.priceRange ? '−' : '+'}</span>
        </button>
        {expandedSections.priceRange && (
          <div className="filter-content">
            <div className="price-slider">
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={priceRange[1]}
                onChange={handlePriceChange}
              />
              <div className="price-labels">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
