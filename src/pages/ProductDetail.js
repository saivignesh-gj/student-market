import { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../App';

function ProductDetail() {
  const { id } = useParams();
  const { products } = useContext(AppContext);

  const product = products.find((p) => String(p.id) === String(id));

  if (!product) {
    return (
      <div className="page-content">
        <Link to="/home" className="back-link">← Back to listings</Link>
        <p className="empty-state">Product not found.</p>
      </div>
    );
  }

  const { photoUrl, title, price, category, description, seller, university, createdAt } = product;

  const date = new Date(createdAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="page-content">
      <Link to="/home" className="back-link">← Back to listings</Link>

      {photoUrl && (
        <img className="detail-img" src={photoUrl} alt={title} />
      )}

      <div className="detail-body">
        <div className="card-header">
          <h1 className="detail-title">{title}</h1>
          <span className="card-price">{price} €</span>
        </div>
        <span className="badge">{category}</span>
        <p className="detail-desc">{description}</p>
        <p className="card-seller">{seller} · {university}</p>
        <p className="detail-date">Posted on {date}</p>
      </div>
    </div>
  );
}

export default ProductDetail;
