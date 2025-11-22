// ProductPage.tailwind.jsx - Beautiful Redesign with Organic Theme
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProductDetailsQuery, useCreateProductReviewMutation } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import { toast } from 'react-toastify';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { addCurrency } from '../utils/addCurrency';
import Reviews from '../components/Reviews';

const UPLOADED_FALLBACK = '/mnt/data/213eed51-c753-4963-922a-bfbf58db3b0b.png';

const ProductPage = () => {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const { userInfo } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
  const [createProductReview, { isLoading: isCreateProductReviewLoading }] = useCreateProductReviewMutation();

  // normalize images into array of { url, alt }
  const normalizeImages = prod => {
    if (!prod) return [{ url: UPLOADED_FALLBACK, alt: 'product' }];
    if (Array.isArray(prod.images) && prod.images.length) {
      return prod.images.map(img => ({ url: img.url || img, alt: img.alt || prod.name || 'product' }));
    }
    if (prod.image) {
      return [{ url: prod.image, alt: prod.name || 'product' }];
    }
    return [{ url: UPLOADED_FALLBACK, alt: prod.name || 'product' }];
  };

  useEffect(() => {
    if (product) {
      const imgs = normalizeImages(product);
      setMainImage(imgs[0].url);
    }
  }, [product]);

  const addToCartHandler = () => {
    const item = {
      ...product,
      image: mainImage || (product && product.image) || UPLOADED_FALLBACK,
      qty
    };
    dispatch(addToCart(item));
    toast.success('Product added to cart!');
  };

  const submitHandler = async e => {
    e.preventDefault();
    try {
      const res = await createProductReview({ productId, rating, comment });
      if (res.error) {
        toast.error(res.error?.data?.message || 'Failed to submit review');
      } else {
        toast.success(res.data?.message || 'Review submitted');
      }
      setRating(0);
      setComment('');
    } catch (err) {
      toast.error(err?.data?.message || err.error || 'Something went wrong');
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">{error?.data?.message || error.error}</Message>;

  const images = normalizeImages(product);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-[#2E7D32] hover:text-[#1B5E20] font-medium mb-6 transition-colors group"
        >
          <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Shop
        </Link>

        <Meta title={product?.name} description={product?.description} />

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* LEFT: Images Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden group border-2 border-[#2E7D32]/10">
              <div className="relative aspect-square flex items-center justify-center p-8 bg-gradient-to-br from-white to-green-50">
                <img
                  src={mainImage || images[0].url}
                  alt={product?.name}
                  className="max-w-full max-h-full object-contain cursor-pointer transition-transform duration-300 group-hover:scale-105"
                  onClick={() => setIsZoomed(true)}
                />
                {/* Zoom Icon */}
                <button
                  onClick={() => setIsZoomed(true)}
                  className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-[#FBC02D] hover:shadow-xl transform hover:scale-110"
                  aria-label="Zoom image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#2E7D32]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img.url)}
                  className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden transition-all duration-300 ${
                    mainImage === img.url 
                      ? 'ring-4 ring-[#2E7D32] shadow-lg scale-105' 
                      : 'ring-2 ring-gray-200 hover:ring-[#FBC02D] hover:scale-105 shadow-md'
                  }`}
                >
                  <img 
                    src={img.url} 
                    alt={img.alt || `${product?.name}-${idx}`} 
                    className="w-full h-full object-cover" 
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Product Details Section */}
          <div className="space-y-6">
            {/* Product Title */}
            <div>
              <h6 className="text-2xl lg:text-2xl font-bold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h6>
             
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-[#2E7D32] to-[#388E3C] text-white p-6 rounded-2xl shadow-xl">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold">
                  {addCurrency(product.price)}
                </span>
                <span className="text-lg opacity-90">per unit</span>
              </div>
            </div>

            {/* Availability & Quantity */}
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-5 border-2 border-[#2E7D32]/10">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-semibold text-md">Availability:</span>
                <span className={`font-bold text-2xl px-4 py-1 rounded-full ${
                  product.countInStock > 0 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {product.countInStock > 0 ? '✓ In Stock' : '✗ Out Of Stock'}
                </span>
              </div>

              {product.countInStock > 0 && (
                <div className="flex items-center gap-4">
                  <label className="text-gray-700 font-semibold text-lg">Quantity:</label>
                  <div className="flex items-center bg-gray-50 border-2 border-[#2E7D32]/20 rounded-xl overflow-hidden shadow-md">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="px-5 py-3 hover:bg-[#2E7D32] hover:text-white transition-colors text-xl font-bold"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={qty}
                      onChange={e => setQty(Math.max(1, Math.min(product.countInStock, Number(e.target.value))))}
                      className="w-20 text-center border-x-2 border-[#2E7D32]/20 py-3 font-bold text-lg bg-white"
                      min="1"
                      max={product.countInStock}
                    />
                    <button
                      onClick={() => setQty(Math.min(product.countInStock, qty + 1))}
                      className="px-5 py-3 hover:bg-[#2E7D32] hover:text-white transition-colors text-xl font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
              className={`w-full py-5 rounded-2xl text-white font-bold text-xl transition-all shadow-xl transform hover:-translate-y-1 ${
                product.countInStock === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#2E7D32] to-[#388E3C] hover:from-[#1B5E20] hover:to-[#2E7D32] hover:shadow-2xl active:scale-95'
              }`}
            >
              {product.countInStock === 0 ? 'Out of Stock' : '🛒 Add To Cart'}
            </button>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-[#2E7D32]/10">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Available Options:</h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((v, i) => (
                    <button 
                      key={i} 
                      className="px-5 py-2 border-2 border-[#2E7D32] rounded-xl text-sm font-semibold hover:bg-[#2E7D32] hover:text-white transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Product Meta */}
            <div className="bg-gradient-to-br from-[#FBC02D]/10 to-[#FDD835]/10 rounded-2xl p-6 space-y-3 border-2 border-[#FBC02D]/30 shadow-md">
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-800">SKU:</span> 
                <span className="text-gray-700">{product.sku || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-800">Category:</span> 
                <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-[#2E7D32] shadow-sm">
                  {product.category || 'Uncategorized'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-[#2E7D32]/10">
          <div className="border-b-2 border-gray-100 bg-gradient-to-r from-green-50 to-yellow-50">
            <div className="flex gap-2 px-6">
              <button
                onClick={() => setActiveTab('description')}
                className={`pb-4 pt-6 px-6 text-base font-bold transition-all relative ${
                  activeTab === 'description'
                    ? 'text-[#2E7D32]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                📝 Description
                {activeTab === 'description' && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#2E7D32] rounded-t-full"></span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('additional')}
                className={`pb-4 pt-6 px-6 text-base font-bold transition-all relative ${
                  activeTab === 'additional'
                    ? 'text-[#2E7D32]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                📋 Additional Info
                {activeTab === 'additional' && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#2E7D32] rounded-t-full"></span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-4 pt-6 px-6 text-base font-bold transition-all relative ${
                  activeTab === 'reviews'
                    ? 'text-[#2E7D32]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                ⭐ Reviews ({product.numReviews})
                {activeTab === 'reviews' && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#2E7D32] rounded-t-full"></span>
                )}
              </button>
            </div>
          </div>

          <div className="p-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <h3 className="text-2xl font-bold text-[#2E7D32] mb-4">🌿 Health Benefits:</h3>
                <div className="text-gray-700 leading-relaxed text-lg">
                  <p className="mb-4">{product.description}</p>
                  <ul className="space-y-2 list-disc list-inside text-gray-600">
                    <li>Pepper is good for gut health and aids in digestion thereby preventing constipation</li>
                    <li>It treats skin ailments</li>
                    <li>Excellent for hair growth</li>
                    <li>Known for aiding in weight loss, treating depression and also respiratory diseases</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'additional' && (
              <div className="text-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
                  <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
                    <div className="font-bold text-gray-800 mb-1">Weight</div>
                    <div className="text-gray-600">{product.weight || 'N/A'}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
                    <div className="font-bold text-gray-800 mb-1">Dimensions</div>
                    <div className="text-gray-600">{product.dimensions || 'N/A'}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
                    <div className="font-bold text-gray-800 mb-1">SKU</div>
                    <div className="text-gray-600">{product.sku || 'N/A'}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
                    <div className="font-bold text-gray-800 mb-1">Category</div>
                    <div className="text-gray-600">{product.category || 'Uncategorized'}</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <Reviews
                product={product}
                userInfo={userInfo}
                rating={rating}
                loading={isCreateProductReviewLoading}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                submitHandler={submitHandler}
              />
            )}
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setIsZoomed(false)}
        >
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-6 right-6 text-white text-5xl leading-none hover:text-[#FBC02D] transition-colors w-14 h-14 flex items-center justify-center bg-black/50 rounded-full hover:bg-black/70"
            aria-label="Close zoom"
          >
            ×
          </button>
          <img
            src={mainImage || images[0].url}
            alt={product?.name}
            className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default ProductPage;