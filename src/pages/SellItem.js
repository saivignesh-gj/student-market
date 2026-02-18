import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';

const CATEGORIES = ['Furniture', 'Electronics', 'Books', 'Other'];

function SellItem() {
  const { user, products, setProducts } = useContext(AppContext);
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
      setError('Please fill in all required fields.');
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
      <h2 className="page-title">New Listing</h2>
      <form onSubmit={handleSubmit}>
        <label className="field-label">Photo URL</label>
        <input
          className="input"
          type="text"
          placeholder="https://..."
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />

        <label className="field-label">Or upload from device</label>
        <input
          className="input input-file"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />

        {previewSrc && (
          <img className="photo-preview" src={previewSrc} alt="Preview" />
        )}

        <label className="field-label">Title *</label>
        <input
          className="input"
          type="text"
          placeholder="e.g. IKEA desk"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="field-label">Price in € *</label>
        <input
          className="input"
          type="number"
          placeholder="0"
          min="0"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label className="field-label">Category *</label>
        <select
          className="input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <label className="field-label">Description *</label>
        <textarea
          className="input"
          rows={4}
          placeholder="Describe the item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {error && <p className="auth-error">{error}</p>}

        <button className="button-primary" type="submit">
          Post listing
        </button>
      </form>
    </div>
  );
}

export default SellItem;
