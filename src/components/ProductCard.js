function ProductCard({ product }) {
  const { photoUrl, title, price, category, description, seller, university } = product;

  return (
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
    </div>
  );
}

export default ProductCard;
