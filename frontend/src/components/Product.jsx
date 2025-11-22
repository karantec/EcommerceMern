import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import { addCurrency } from '../utils/addCurrency';
import Rating from './Rating';
import { toast } from 'react-toastify';

// Use your uploaded image path as fallback (will be converted by the environment)
const FALLBACK_IMG = '/mnt/data/bbe45c33-529f-448c-9104-ee2e1fba7394.png';

const isNew = (createdAtIso) => {
  if (!createdAtIso) return false;
  const created = new Date(createdAtIso);
  const now = new Date();
  const diffDays = (now - created) / (1000 * 60 * 60 * 24);
  return diffDays <= 7; // within last 7 days
};

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty: 1 }));
    toast.success('Added to cart!');
  };

  const imgSrc = product?.image || FALLBACK_IMG;

  // Stock label text + color classes
  const stockLabel = (() => {
    if (!product?.countInStock || product.countInStock <= 0) return { text: 'Out of stock', classes: 'bg-gray-300 text-gray-700' };
    if (product.countInStock <= 5) return { text: `Low stock (${product.countInStock})`, classes: 'bg-amber-100 text-amber-700' };
    return { text: `In stock (${product.countInStock})`, classes: 'bg-emerald-100 text-emerald-700' };
  })();

  // description snippet
  const snippet = product?.description ? product.description.slice(0, 100) + (product.description.length > 100 ? '...' : '') : '';

  return (
    <article className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
      {/* image */}
      <Link to={`/product/${product._id}`} className="w-full h-52 bg-gray-50 flex items-center justify-center overflow-hidden">
        <img
          src={imgSrc}
          alt={product.name}
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG; }}
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start gap-2">
          <div className="flex-1 min-w-0">
            <Link to={`/product/${product._id}`} className="text-lg font-semibold text-gray-800 hover:text-green-600 transition line-clamp-2">
              {product.name}
            </Link>
            {product.brand && (
              <div className="text-sm text-gray-500 mt-1">
                {product.brand}
              </div>
            )}
          </div>

          {/* New badge */}
          {isNew(product?.createdAt) && (
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
              New
            </span>
          )}
        </div>

        {/* rating & reviews */}
       

        {/* description snippet */}
        {snippet && (
          <p className="mt-3 text-sm text-gray-600 line-clamp-2">
            {snippet}
          </p>
        )}

        {/* price + stock row */}
        <div className="mt-4 flex items-center gap-3">
          <div className="text-2xl font-bold text-gray-900">
            {addCurrency(product.price)}
          </div>

          <div className={`ml-auto text-xs font-medium px-2 py-1 rounded-full ${stockLabel.classes}`}>
            {stockLabel.text}
          </div>
        </div>

        {/* actions */}
        <div className="mt-4">
          <button
            onClick={addToCartHandler}
            disabled={product.countInStock === 0}
            className={`w-full py-2 rounded-lg font-semibold text-white transition-colors 
              ${product.countInStock === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-md"
              }`}
          >
            {product.countInStock === 0 ? "Out of Stock" : "Add To Cart"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default Product;
