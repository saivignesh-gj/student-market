import { useContext } from 'react';
import { AppContext } from '../App';
import ProductCard from '../components/ProductCard';

function Home() {
  const { products } = useContext(AppContext);

  const sorted = [...products].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="page-content">
      {sorted.length === 0 ? (
        <p className="empty-state">No listings yet. Be the first to sell something!</p>
      ) : (
        sorted.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
}

export default Home;
