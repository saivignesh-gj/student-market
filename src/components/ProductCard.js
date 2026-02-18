import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';

function ProductCard({ product, onDelete }) {
  const { t } = useContext(AppContext);
  const { id, photoUrl, title, price, category, description, seller, university } = product;

  function handleDelete(e) {
    // Prevent the Link from navigating when the delete button is clicked
    e.preventDefault();
    e.stopPropagation();
    onDelete(id);
  }

  return (
    <Link to={`/product/${id}`} className="card-link">
      <div className="card">
        {photoUrl && (
          <img className="card-img" src={photoUrl} alt={title} />
        )}
        <div className="card-header">
          <span className="card-title">{title}</span>
          <span className="card-price">{price} €</span>
        </div>
        <span className="badge">{category}</span>
        <p className="card-desc">{description}</p>
        <p className="card-seller">{seller} · {university}</p>
        <button className="delete-btn" onClick={handleDelete}>
          {t.delete}
        </button>
      </div>
    </Link>
  );
}

export default ProductCard;
