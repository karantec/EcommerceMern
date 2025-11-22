import React, { useEffect, useState } from 'react';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { useSelector } from 'react-redux';

import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import Home from '../components/Home';

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(0);
  const [skip, setSkip] = useState(0);

  // Filter states
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [minRating, setMinRating] = useState(0);
  const [inStock, setInStock] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');

  const { search } = useSelector((state) => state.search);

  const { data, isLoading, error } = useGetProductsQuery({
    limit,
    skip,
    search,
  });

  // Extract unique categories and brands from products
  const categories = data?.products 
    ? [...new Set(data.products
        .map(p => p.category?.name)
        .filter(Boolean))]
    : [];

  const brands = data?.products 
    ? [...new Set(data.products
        .map(p => p.brand)
        .filter(Boolean))]
    : [];

  useEffect(() => {
    if (data) {
      setLimit(10);
      setSkip((currentPage - 1) * (limit || 10));
      setTotal(data.total || 0);
      setTotalPage(Math.ceil((data.total || 0) / (limit || 10)));
    }
  }, [currentPage, data, limit, search]);

  const pageHandler = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPage && pageNum !== currentPage) {
      setCurrentPage(pageNum);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Filter and sort products
  const getFilteredAndSortedProducts = () => {
    if (!data?.products) return [];
    
    let filtered = [...data.products];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => 
        selectedCategories.includes(p.category?.name)
      );
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter(p => 
        selectedBrands.includes(p.brand)
      );
    }

    if (priceRange.min !== '' || priceRange.max !== '') {
      filtered = filtered.filter(p => {
        const price = p.price || 0;
        const min = priceRange.min === '' ? 0 : Number(priceRange.min);
        const max = priceRange.max === '' ? Infinity : Number(priceRange.max);
        return price >= min && price <= max;
      });
    }

    if (minRating > 0) {
      filtered = filtered.filter(p => (p.rating || 0) >= minRating);
    }

    if (inStock) {
      filtered = filtered.filter(p => (p.countInStock || 0) > 0);
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'reviews':
        filtered.sort((a, b) => (b.numReviews || 0) - (a.numReviews || 0));
        break;
      case 'name':
        filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredProducts = getFilteredAndSortedProducts();

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange({ min: '', max: '' });
    setMinRating(0);
    setInStock(false);
  };

  const activeFilterCount = 
    selectedCategories.length + 
    selectedBrands.length +
    (priceRange.min || priceRange.max ? 1 : 0) + 
    (minRating > 0 ? 1 : 0) +
    (inStock ? 1 : 0);

  const getCategoryCount = (categoryName) => {
    return data?.products?.filter(p => p.category?.name === categoryName).length || 0;
  };

  const getBrandCount = (brandName) => {
    return data?.products?.filter(p => p.brand === brandName).length || 0;
  };

  // Simple icon components
  const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </svg>
  );

  const GridIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="7" height="7" x="3" y="3" rx="1"></rect>
      <rect width="7" height="7" x="14" y="3" rx="1"></rect>
      <rect width="7" height="7" x="14" y="14" rx="1"></rect>
      <rect width="7" height="7" x="3" y="14" rx="1"></rect>
    </svg>
  );

  const ListIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" x2="21" y1="6" y2="6"></line>
      <line x1="8" x2="21" y1="12" y2="12"></line>
      <line x1="8" x2="21" y1="18" y2="18"></line>
      <line x1="3" x2="3.01" y1="6" y2="6"></line>
      <line x1="3" x2="3.01" y1="12" y2="12"></line>
      <line x1="3" x2="3.01" y1="18" y2="18"></line>
    </svg>
  );

  const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18"></path>
      <path d="m6 6 12 12"></path>
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50">
      <Meta title="Home" />
      <Home />

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="relative">
              <Loader />
              <div className="absolute -inset-4 bg-green-200 rounded-full blur-2xl opacity-20 animate-pulse"></div>
            </div>
            <p className="mt-6 text-green-700 font-semibold text-lg animate-pulse">
              🌿 Loading fresh products...
            </p>
          </div>
        ) : error ? (
          <div className="py-10 max-w-2xl mx-auto">
            <Message variant="danger">
              {error?.data?.message || error.error}
            </Message>
          </div>
        ) : (
          <>
            <div className="max-w-7xl mx-auto mb-6">
              <div className="text-sm text-gray-600">
                <span className="hover:text-green-600 cursor-pointer">Home</span>
                <span className="mx-2">/</span>
                <span className="text-green-600 font-medium">Shop</span>
              </div>
            </div>

            <div className="max-w-7xl mx-auto mb-8">
              <h1 className="text-5xl font-bold text-green-600">
                {search ? 'Search Results' : 'Shop'}
              </h1>
            </div>

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
              {/* Sidebar - Desktop */}
              <aside className="hidden lg:block lg:w-80 flex-shrink-0">
                <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 sticky top-4">
                  <div className="mb-6">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-4 pr-10 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                      <button className="absolute right-0 top-0 h-full px-3 bg-green-600 text-white rounded-r-lg hover:bg-green-700 transition-colors">
                        <SearchIcon />
                      </button>
                    </div>
                  </div>

                  <div className="mb-6 pb-6 border-b-2 border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Product categories</h3>
                    <div className="space-y-2">
                      {categories.length > 0 ? categories.map(cat => (
                        <label key={cat} className="flex items-center justify-between cursor-pointer group hover:bg-green-50 p-2 rounded-lg transition-colors">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(cat)}
                              onChange={() => toggleCategory(cat)}
                              className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                            />
                            <span className="text-green-600 group-hover:text-green-700 text-sm font-medium">
                              {cat}
                            </span>
                          </div>
                          <span className="text-gray-400 text-sm">({getCategoryCount(cat)})</span>
                        </label>
                      )) : (
                        <p className="text-gray-500 text-sm">No categories available</p>
                      )}
                    </div>
                  </div>

                  {brands.length > 0 && (
                    <div className="mb-6 pb-6 border-b-2 border-gray-100">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Brands</h3>
                      <div className="space-y-2">
                        {brands.map(brand => (
                          <label key={brand} className="flex items-center justify-between cursor-pointer group hover:bg-blue-50 p-2 rounded-lg transition-colors">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={selectedBrands.includes(brand)}
                                onChange={() => toggleBrand(brand)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                              />
                              <span className="text-gray-700 group-hover:text-blue-700 text-sm font-medium">
                                {brand}
                              </span>
                            </div>
                            <span className="text-gray-400 text-sm">({getBrandCount(brand)})</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mb-6 pb-6 border-b-2 border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Filter by price</h3>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <input
                          type="number"
                          placeholder="Min ₹"
                          value={priceRange.min}
                          onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                          className="w-1/2 px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                        <input
                          type="number"
                          placeholder="Max ₹"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                          className="w-1/2 px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      <button 
                        className="w-full py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-300 transition-colors"
                      >
                        FILTER
                      </button>
                    </div>
                  </div>

                  <div className="mb-6 pb-6 border-b-2 border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Minimum Rating</h3>
                    <div className="space-y-2">
                      {[0, 1, 2, 3, 4, 5].map(rating => (
                        <label key={rating} className="flex items-center gap-2 cursor-pointer group hover:bg-orange-50 p-2 rounded-lg transition-colors">
                          <input
                            type="radio"
                            name="rating"
                            checked={minRating === rating}
                            onChange={() => setMinRating(rating)}
                            className="w-4 h-4 text-orange-600"
                          />
                          <span className="text-sm font-medium text-gray-700 group-hover:text-orange-700">
                            {rating === 0 ? 'All Ratings' : `${rating}+ ⭐`}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Availability</h3>
                    <label className="flex items-center gap-3 cursor-pointer group hover:bg-purple-50 p-2 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={inStock}
                        onChange={(e) => setInStock(e.target.checked)}
                        className="w-5 h-5 rounded border-2 border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                      />
                      <span className="text-gray-700 font-medium group-hover:text-purple-600 text-sm">
                        ✅ In stock only
                      </span>
                    </label>
                  </div>

                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="w-full py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-bold hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg"
                    >
                      🗑️ Clear All Filters ({activeFilterCount})
                    </button>
                  )}

                  {data?.products && data.products.length > 0 && (
                    <div className="mt-6 pt-6 border-t-2 border-gray-100">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Recent products</h3>
                      <div className="space-y-4">
                        {data.products.slice(0, 3).map(product => (
                          <div key={product._id} className="flex gap-3 group cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-2xl flex-shrink-0 overflow-hidden">
                              {product.image ? (
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                              ) : (
                                '🛍️'
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-gray-900 group-hover:text-green-600 truncate transition-colors">
                                {product.name}
                              </h4>
                              <p className="text-sm text-gray-600 mt-1 font-medium">
                                ₹{product.price?.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </aside>

              {/* Mobile Filter Button */}
              <div className="lg:hidden mb-6">
                <button
                  onClick={() => setShowSidebar(true)}
                  className="w-full py-3 bg-gradient-to-r from-green-700 to-green-600 text-white rounded-xl font-bold hover:from-green-800 hover:to-green-700 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  🎯 Filters & Categories
                  {activeFilterCount > 0 && (
                    <span className="bg-white text-green-700 px-2 py-0.5 rounded-full text-xs font-bold">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Mobile Sidebar Modal */}
              {showSidebar && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden">
                  <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-white shadow-2xl overflow-y-auto">
                    <div className="sticky top-0 bg-gradient-to-r from-green-700 to-green-600 text-white p-4 flex justify-between items-center z-10">
                      <h3 className="text-xl font-bold">Filters</h3>
                      <button
                        onClick={() => setShowSidebar(false)}
                        className="text-white hover:bg-white/20 rounded-full p-2 w-10 h-10 flex items-center justify-center transition-colors"
                      >
                        <CloseIcon />
                      </button>
                    </div>
                    <div className="p-6">
                      <div className="mb-6">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-4 pr-10 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                          <button className="absolute right-0 top-0 h-full px-3 bg-green-600 text-white rounded-r-lg hover:bg-green-700 transition-colors">
                            <SearchIcon />
                          </button>
                        </div>
                      </div>

                      <div className="mb-6 pb-6 border-b-2 border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Product categories</h3>
                        <div className="space-y-2">
                          {categories.length > 0 ? categories.map(cat => (
                            <label key={cat} className="flex items-center justify-between cursor-pointer group hover:bg-green-50 p-2 rounded-lg transition-colors">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={selectedCategories.includes(cat)}
                                  onChange={() => toggleCategory(cat)}
                                  className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                                />
                                <span className="text-green-600 group-hover:text-green-700 text-sm font-medium">
                                  {cat}
                                </span>
                              </div>
                              <span className="text-gray-400 text-sm">({getCategoryCount(cat)})</span>
                            </label>
                          )) : (
                            <p className="text-gray-500 text-sm">No categories available</p>
                          )}
                        </div>
                      </div>

                      {brands.length > 0 && (
                        <div className="mb-6 pb-6 border-b-2 border-gray-100">
                          <h3 className="text-lg font-bold text-gray-900 mb-4">Brands</h3>
                          <div className="space-y-2">
                            {brands.map(brand => (
                              <label key={brand} className="flex items-center justify-between cursor-pointer group hover:bg-blue-50 p-2 rounded-lg transition-colors">
                                <div className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    checked={selectedBrands.includes(brand)}
                                    onChange={() => toggleBrand(brand)}
                                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                  />
                                  <span className="text-gray-700 group-hover:text-blue-700 text-sm font-medium">
                                    {brand}
                                  </span>
                                </div>
                                <span className="text-gray-400 text-sm">({getBrandCount(brand)})</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mb-6 pb-6 border-b-2 border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Filter by price</h3>
                        <div className="space-y-3">
                          <div className="flex gap-3">
                            <input
                              type="number"
                              placeholder="Min ₹"
                              value={priceRange.min}
                              onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                              className="w-1/2 px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                            <input
                              type="number"
                              placeholder="Max ₹"
                              value={priceRange.max}
                              onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                              className="w-1/2 px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mb-6 pb-6 border-b-2 border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Minimum Rating</h3>
                        <div className="space-y-2">
                          {[0, 1, 2, 3, 4, 5].map(rating => (
                            <label key={rating} className="flex items-center gap-2 cursor-pointer group hover:bg-orange-50 p-2 rounded-lg transition-colors">
                              <input
                                type="radio"
                                name="rating-mobile"
                                checked={minRating === rating}
                                onChange={() => setMinRating(rating)}
                                className="w-4 h-4 text-orange-600"
                              />
                              <span className="text-sm font-medium text-gray-700 group-hover:text-orange-700">
                                {rating === 0 ? 'All Ratings' : `${rating}+ ⭐`}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Availability</h3>
                        <label className="flex items-center gap-3 cursor-pointer group hover:bg-purple-50 p-2 rounded-lg transition-colors">
                          <input
                            type="checkbox"
                            checked={inStock}
                            onChange={(e) => setInStock(e.target.checked)}
                            className="w-5 h-5 rounded border-2 border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                          />
                          <span className="text-gray-700 font-medium group-hover:text-purple-600 text-sm">
                            ✅ In stock only
                          </span>
                        </label>
                      </div>

                      {activeFilterCount > 0 && (
                        <button
                          onClick={clearFilters}
                          className="w-full py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-bold hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg"
                        >
                          🗑️ Clear All Filters ({activeFilterCount})
                        </button>
                      )}

                      <button
                        onClick={() => setShowSidebar(false)}
                        className="w-full mt-4 py-3 bg-gradient-to-r from-green-700 to-green-600 text-white rounded-lg font-bold hover:from-green-800 hover:to-green-700 transition-all shadow-lg"
                      >
                        ✓ Apply Filters
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Main Content */}
              <main className="flex-1">
                <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-4 mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-sm text-gray-600 font-medium">
                      Showing{' '}
                      {filteredProducts.length > 0 && (
                        <>
                          <span className="font-bold text-green-700">{filteredProducts.length}</span>
                          {` result${filteredProducts.length !== 1 ? 's' : ''}`}
                          {activeFilterCount > 0 && (
                            <span className="text-gray-500">
                              {' '}(filtered from {data?.products?.length || 0})
                            </span>
                          )}
                        </>
                      )}
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600 font-medium hidden sm:block">Sort:</label>
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
                        >
                          <option value="newest">Newest First</option>
                          <option value="price-low">Price: Low to High</option>
                          <option value="price-high">Price: High to Low</option>
                          <option value="rating">Highest Rated</option>
                          <option value="reviews">Most Reviewed</option>
                          <option value="name">Name: A to Z</option>
                        </select>
                      </div>

                      <div className="hidden sm:flex gap-1 border-2 border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => setViewMode('grid')}
                          className={`p-2 transition-colors ${
                            viewMode === 'grid'
                              ? 'bg-green-600 text-white'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <GridIcon />
                        </button>
                        <button
                          onClick={() => setViewMode('list')}
                          className={`p-2 transition-colors ${
                            viewMode === 'list'
                              ? 'bg-green-600 text-white'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <ListIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {activeFilterCount > 0 && (
                  <div className="mb-6 p-4 bg-white/70 backdrop-blur-sm rounded-2xl border-2 border-gray-200">
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        🏷️ Active filters:
                      </span>

                      {selectedCategories.map(cat => (
                        <span
                          key={cat}
                          className="px-3 py-1.5 bg-gradient-to-r from-green-700 to-green-600 text-white rounded-full text-xs font-medium flex items-center gap-2 shadow-md"
                        >
                          📦 {cat}
                          <button
                            onClick={() => toggleCategory(cat)}
                            className="hover:text-red-200 hover:scale-110 transition-transform"
                          >
                            ✕
                          </button>
                        </span>
                      ))}

                      {selectedBrands.map(brand => (
                        <span
                          key={brand}
                          className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-xs font-medium flex items-center gap-2 shadow-md"
                        >
                          🏢 {brand}
                          <button
                            onClick={() => toggleBrand(brand)}
                            className="hover:text-red-200 hover:scale-110 transition-transform"
                          >
                            ✕
                          </button>
                        </span>
                      ))}

                      {(priceRange.min || priceRange.max) && (
                        <span className="px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white rounded-full text-xs font-medium flex items-center gap-2 shadow-md">
                          💰 ₹{priceRange.min || '0'} - ₹{priceRange.max || '∞'}
                          <button
                            onClick={() => setPriceRange({ min: '', max: '' })}
                            className="hover:text-red-200 hover:scale-110 transition-transform"
                          >
                            ✕
                          </button>
                        </span>
                      )}

                      {minRating > 0 && (
                        <span className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full text-xs font-medium flex items-center gap-2 shadow-md">
                          ⭐ {minRating}+ Rating
                          <button
                            onClick={() => setMinRating(0)}
                            className="hover:text-red-200 hover:scale-110 transition-transform"
                          >
                            ✕
                          </button>
                        </span>
                      )}

                      {inStock && (
                        <span className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full text-xs font-medium flex items-center gap-2 shadow-md">
                          ✅ In Stock Only
                          <button
                            onClick={() => setInStock(false)}
                            className="hover:text-red-200 hover:scale-110 transition-transform"
                          >
                            ✕
                          </button>
                        </span>
                      )}

                      <button
                        onClick={clearFilters}
                        className="ml-auto px-4 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full text-xs font-bold hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                      >
                        <span>🗑️</span> Clear all
                      </button>
                    </div>
                  </div>
                )}

                {filteredProducts.length > 0 ? (
                  <div
                    className={`grid gap-6 mb-12 ${
                      viewMode === 'grid'
                        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'
                        : 'grid-cols-1'
                    }`}
                  >
                    {filteredProducts.map((product) => (
                      <div
                        key={product._id}
                        className="transform hover:scale-105 transition-transform duration-300"
                      >
                        <Product product={product} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-24 bg-gradient-to-br from-white to-green-50 rounded-3xl shadow-xl border-2 border-dashed border-gray-300">
                    <div className="text-8xl mb-6">🔍</div>
                    <h3 className="text-3xl font-extrabold text-gray-900 mb-3">No products found</h3>
                    <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">
                      {activeFilterCount > 0
                        ? 'Try adjusting your filters to see more products'
                        : search
                        ? `We couldn't find any products matching "${search}"`
                        : 'Check back soon for amazing new products'}
                    </p>
                    {activeFilterCount > 0 && (
                      <button
                        onClick={clearFilters}
                        className="px-8 py-4 bg-gradient-to-r from-green-700 to-green-600 text-white rounded-2xl font-bold hover:from-green-800 hover:to-green-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2 mx-auto"
                      >
                        <span>🔄</span>
                        Clear All Filters
                      </button>
                    )}
                  </div>
                )}

                {totalPage > 1 && !search && (
                  <div className="mt-16 flex justify-center">
                    <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-green-200">
                      <Paginate
                        currentPage={currentPage}
                        totalPage={totalPage}
                        pageHandler={pageHandler}
                      />
                    </div>
                  </div>
                )}
              </main>
            </div>

            {!search && data?.products && data.products.length > 0 && (
              <section className="mt-20 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-extrabold text-gray-900 mb-3">Why Choose Us?</h3>
                  <p className="text-gray-600 text-lg">We're committed to bringing you the best</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group bg-gradient-to-br from-white to-green-50 rounded-3xl p-8 shadow-lg border-2 border-green-200 hover:border-green-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-700 to-green-600 rounded-2xl flex items-center justify-center mb-6 text-3xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      ⭐
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">
                      Quality Assured
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Every product is handpicked and rigorously quality tested before it reaches you.
                    </p>
                  </div>

                  <div className="group bg-gradient-to-br from-white to-orange-50 rounded-3xl p-8 shadow-lg border-2 border-orange-200 hover:border-orange-400 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 text-3xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      🚀
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                      Fast Delivery
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Get your products delivered quickly and safely right to your doorstep.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {!search && data?.products && data.products.length > 0 && (
              <section className="mt-20 max-w-5xl mx-auto">
                <div className="bg-gradient-to-r from-green-700 to-green-600 rounded-3xl p-12 shadow-2xl text-center text-white relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-32 -translate-y-32"></div>
                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-32 translate-y-32"></div>

                  <div className="relative z-10">
                    <h3 className="text-4xl font-extrabold mb-4">Join Our Happy Customers! 🎉</h3>
                    <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
                      Thousands of customers trust us for authentic products delivered with care.
                    </p>
                    <div className="flex flex-wrap justify-center gap-8 text-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 min-w-[140px]">
                        <div className="text-4xl font-extrabold mb-1">10K+</div>
                        <div className="text-green-100 text-sm font-medium">Happy Customers</div>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 min-w-[140px]">
                        <div className="text-4xl font-extrabold mb-1">
                          {data?.products?.length || 500}+
                        </div>
                        <div className="text-green-100 text-sm font-medium">Products</div>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 min-w-[140px]">
                        <div className="text-4xl font-extrabold mb-1">4.9★</div>
                        <div className="text-green-100 text-sm font-medium">Average Rating</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;