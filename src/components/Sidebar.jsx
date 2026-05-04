import { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ filters, onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState(10000);

  const categories = [
    { value: 'bracelet', label: 'Bracelets' },
    { value: 'pendant', label: 'Pendants' }
  ];

  const handleCategoryChange = (value) => {
    const updated = selectedCategories.includes(value)
      ? selectedCategories.filter(c => c !== value)
      : [...selectedCategories, value];
    setSelectedCategories(updated);
    onFilterChange?.({ categories: updated, priceRange });
  };

  const handlePriceChange = (e) => {
    const val = parseInt(e.target.value);
    setPriceRange(val);
    onFilterChange?.({ categories: selectedCategories, priceRange: val });
  };

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Filters</h2>

      <div className="filter-section">
        <div className="filter-header">
          <span>Category</span>
        </div>
        <div className="filter-content">
          {categories.map(cat => (
            <label key={cat.value} className="filter-option">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.value)}
                onChange={() => handleCategoryChange(cat.value)}
              />
              <span>{cat.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-header">
          <span>Price Range</span>
        </div>
        <div className="filter-content">
          <div className="price-slider">
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={priceRange}
              onChange={handlePriceChange}
            />
            <div className="price-labels">
              <span>₹0</span>
              <span>₹{priceRange.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
