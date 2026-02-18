import { useState, useContext } from 'react';
import { AppContext } from '../App';
import ProductCard from '../components/ProductCard';
import { CATEGORY_KEYS } from '../i18n';

const CATEGORY_VALUES = ['All', 'Furniture', 'Electronics', 'Books', 'Other'];

function Home() {
  const { products, setProducts, t } = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  function handleDelete(productId) {
    const updated = products.filter((p) => p.id !== productId);
    setProducts(updated);
    localStorage.setItem('studentMarketListings', JSON.stringify(updated));
  }

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
          {CATEGORY_VALUES.map((c) => (
            <option key={c} value={c}>
              {t[CATEGORY_KEYS[c]]}
            </option>
          ))}
        </select>
        <input
          className="input filter-search"
          type="text"
          placeholder={t.searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {products.length === 0 ? (
        <p className="empty-state">{t.emptyState}</p>
      ) : filtered.length === 0 ? (
        <p className="empty-state">{t.noResults}</p>
      ) : (
        <div className="listings-grid">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
