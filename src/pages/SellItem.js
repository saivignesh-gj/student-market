import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';

// Category values are stored in English; the display label is translated in the UI
const CATEGORY_VALUES = ['Furniture', 'Electronics', 'Books', 'Other'];
const CATEGORY_KEYS = {
  Furniture: 'furniture',
  Electronics: 'electronics',
  Books: 'books',
  Other: 'other',
};

function SellItem() {
  const { user, products, setProducts, t } = useContext(AppContext);
  const navigate = useNavigate();

  const [photoUrl, setPhotoUrl] = useState('');
  const [uploadedBlobUrl, setUploadedBlobUrl] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setUploadedBlobUrl(URL.createObjectURL(file));
    } else {
      setUploadedBlobUrl('');
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !price || !category || !description) {
      setError(t.fillRequired);
      return;
    }
    // Uploaded file takes priority over typed URL
    const finalPhotoUrl = uploadedBlobUrl || photoUrl;

    const newProduct = {
      id: Date.now(),
      photoUrl: finalPhotoUrl,
      title,
      price: parseFloat(price),
      category,
      description,
      seller: user.username,
      university: user.university,
      createdAt: Date.now(),
    };
    const updated = [newProduct, ...products];
    setProducts(updated);
    localStorage.setItem('studentMarketListings', JSON.stringify(updated));
    navigate('/home');
  }

  const previewSrc = uploadedBlobUrl || photoUrl;

  return (
    <div className="page-content">
      <h2 className="page-title">{t.newListing}</h2>
      <form onSubmit={handleSubmit}>
        <label className="field-label">{t.photoUrlLabel}</label>
        <input
          className="input"
          type="text"
          placeholder={t.photoPlaceholder}
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />

        <label className="field-label">{t.uploadFromDevice}</label>
        <input
          className="input input-file"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />

        {previewSrc && (
          <img className="photo-preview" src={previewSrc} alt="Preview" />
        )}

        <label className="field-label">{t.titleLabel} *</label>
        <input
          className="input"
          type="text"
          placeholder={t.titlePlaceholder}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="field-label">{t.priceLabel} *</label>
        <input
          className="input"
          type="number"
          placeholder="0"
          min="0"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label className="field-label">{t.categoryLabel} *</label>
        <select
          className="input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">{t.selectCategory}</option>
          {CATEGORY_VALUES.map((c) => (
            <option key={c} value={c}>
              {t[CATEGORY_KEYS[c]]}
            </option>
          ))}
        </select>

        <label className="field-label">{t.descriptionLabel} *</label>
        <textarea
          className="input"
          rows={4}
          placeholder={t.descPlaceholder}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {error && <p className="auth-error">{error}</p>}

        <button className="button-primary" type="submit">
          {t.postListing}
        </button>
      </form>
    </div>
  );
}

export default SellItem;
