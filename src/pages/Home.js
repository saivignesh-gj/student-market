import { useState, useContext } from 'react';
import { AppContext } from '../App';
import ProductCard from '../components/ProductCard';

const CATEGORIES = ['All', 'Furniture', 'Electronics', 'Books', 'Other'];

function Home() {
  const { products } = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const sorted = [...products].sort((a, b) => b.createdAt - a.createdAt);

  const filtered = sorted
    .filter((p) => selectedCategory === 'All' || p.category === selectedCategory)
    .filter((p) => {
      if (!searchTerm.trim()) return true;
      const lower = searchTerm.toLowerCase();
      return (
        p.title.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower)
      );
    });

  return (
    <div className="page-content">
      <div className="filter-row">
        <select
          className="input filter-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c === 'All' ? 'All categories' : c}
            </option>
          ))}
        </select>
        <input
          className="input filter-search"
          type="text"
          placeholder="Search listings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {products.length === 0 ? (
        <p className="empty-state">No listings yet. Be the first to sell something!</p>
      ) : filtered.length === 0 ? (
        <p className="empty-state">No listings match your search.</p>
      ) : (
        <div className="listings-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
