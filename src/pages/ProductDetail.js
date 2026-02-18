import { useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';

function ProductDetail() {
  const { id } = useParams();
  const { products, setProducts, lang, t } = useContext(AppContext);
  const navigate = useNavigate();

  const product = products.find((p) => String(p.id) === String(id));

  function handleDelete() {
    const updated = products.filter((p) => String(p.id) !== String(id));
    setProducts(updated);
    localStorage.setItem('studentMarketListings', JSON.stringify(updated));
    navigate('/home');
  }

  if (!product) {
    return (
      <div className="page-content">
        <Link to="/home" className="back-link">{t.backToListings}</Link>
        <p className="empty-state">{t.productNotFound}</p>
      </div>
    );
  }

  const { photoUrl, title, price, category, description, seller, university, createdAt } = product;

  const locale = lang === 'fr' ? 'fr-FR' : 'en-GB';
  const date = new Date(createdAt).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="page-content">
      <Link to="/home" className="back-link">{t.backToListings}</Link>

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
        <p className="detail-date">{t.postedOn} {date}</p>

        <button className="delete-btn delete-btn-detail" onClick={handleDelete}>
          {t.deleteListing}
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
