import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery, setSelectedCategory, setSortBy, resetFilters } from '../redux/budgetSlice';
import { Search, X, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';

const SearchFilterBar = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.budget.searchQuery);
  const selectedCategory = useSelector((state) => state.budget.selectedCategory);
  const sortBy = useSelector((state) => state.budget.sortBy);

  const categories = ['All', 'Budgeting', 'Needs', 'Expenses', 'Goals', 'Infographics', 'Mistakes'];

  const handleReset = () => {
    dispatch(resetFilters());
    toast.success('Filters reset to default', { duration: 2000 });
  };

  return (
    <div className="search-filter-section">
      <div className="container">
        <div className="search-filter-box">
          <div className="search-input-group">
            <input
              type="text"
              className="search-input"
              placeholder="Search guides, tips, goals, or expenses"
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            />
            {searchQuery && (
              <button
                className="clear-search-btn"
                onClick={() => dispatch(setSearchQuery(''))}
                title="Clear search input"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="filter-controls">
            <div className="category-tags">
              <span className="filter-label">Filter Topic:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`tag-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => dispatch(setSelectedCategory(cat))}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="sort-group">
              <label htmlFor="sort-select" className="sort-label">
                Sort By:
              </label>
              <select
                id="sort-select"
                className="sort-select"
                value={sortBy}
                onChange={(e) => dispatch(setSortBy(e.target.value))}
              >
                <option value="default">Default Order</option>
                <option value="a-z">Name (A - Z)</option>
                <option value="topic">Topic Category</option>
              </select>

              {(searchQuery || selectedCategory !== 'All' || sortBy !== 'default') && (
                <button className="reset-filter-btn" onClick={handleReset}>
                  <RotateCcw size={14} className="icon-inline" /> Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilterBar;