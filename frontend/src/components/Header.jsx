import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { toast } from 'react-toastify';
import SearchBox from './SearchBox';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State management
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
      toast.success('Logout successful');
      setOpenMobileMenu(false);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  // Compute cart qty and total price
  const cartQty = useMemo(
    () => cartItems.reduce((acc, item) => acc + (item.qty || 0), 0),
    [cartItems]
  );

  const cartTotal = useMemo(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + (item.price || 0) * (item.qty || 0),
      0
    );
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(total || 0);
  }, [cartItems]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header Row */}
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Brand */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 no-underline">
              <span className="text-2xl sm:text-3xl">🌿</span>
              <div className="leading-tight">
                <div className="text-base sm:text-xl font-extrabold text-green-600">FARM SHOP</div>
                <div className="text-[10px] sm:text-xs text-green-300 uppercase tracking-widest font-medium hidden sm:block">
                  Organic Lifestyle
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Search - Hidden on mobile/tablet */}
          <div className="hidden lg:flex flex-1 items-center justify-center px-8 max-w-2xl">
            <SearchBox />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            {/* Cart */}
            <Link 
              to="/cart" 
              className="relative inline-flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-50 transition-colors group"
            >
              <span className="text-green-600 font-semibold hidden lg:inline group-hover:text-green-700">
                {cartTotal}
              </span>
              <FaShoppingCart className="text-green-600 text-lg group-hover:text-green-700" />
              {cartQty > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg">
                  {cartQty}
                </span>
              )}
            </Link>

            {/* About */}
            <Link 
              to="/about" 
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-50 transition-colors group"
            >
              <span className="text-green-600 font-semibold group-hover:text-green-700">About</span>
            </Link>

            {/* Contact */}
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-50 transition-colors group"
            >
              <span className="text-green-600 font-semibold group-hover:text-green-700">Contact</span>
            </Link>

            {/* User Menu */}
            <div className="relative">
              {userInfo ? (
                <>
                  <button
                    onClick={() => setOpenUserMenu((s) => !s)}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-50 transition-colors"
                    aria-expanded={openUserMenu}
                    aria-haspopup="true"
                  >
                    <FaUser className="text-green-600" />
                    <span className="hidden lg:inline font-medium text-gray-700">{userInfo.name}</span>
                    <svg
                      className={`w-3 h-3 text-gray-500 ml-1 transition-transform ${openUserMenu ? 'rotate-180' : ''}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {openUserMenu && (
                    <>
                      {/* Backdrop */}
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setOpenUserMenu(false)}
                      ></div>
                      {/* Dropdown */}
                      <div
                        className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-20"
                        role="menu"
                      >
                        <Link
                          to="/profile"
                          onClick={() => setOpenUserMenu(false)}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                          role="menuitem"
                        >
                          👤 Profile
                        </Link>
                        <button
                          onClick={() => {
                            setOpenUserMenu(false);
                            logoutHandler();
                          }}
                          className="w-full text-left block px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                          role="menuitem"
                        >
                          🚪 Logout
                        </button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors shadow-sm"
                >
                  <FaUser />
                  <span>Sign in</span>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Search Icon */}
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="p-2 rounded-lg hover:bg-green-50 transition-colors"
              aria-label="Toggle search"
            >
              <FaSearch className="text-green-600 text-lg" />
            </button>

            {/* Mobile Cart */}
            <Link 
              to="/cart" 
              className="relative p-2 rounded-lg hover:bg-green-50 transition-colors"
              aria-label="Shopping cart"
            >
              <FaShoppingCart className="text-green-600 text-lg" />
              {cartQty > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-xs font-bold rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
                  {cartQty}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setOpenMobileMenu(!openMobileMenu)}
              className="p-2 rounded-lg hover:bg-green-50 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={openMobileMenu}
            >
              {openMobileMenu ? (
                <FaTimes className="text-green-600 text-xl" />
              ) : (
                <FaBars className="text-green-600 text-xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar - Tablet/Mobile */}
        {showMobileSearch && (
          <div className="lg:hidden pb-4 animate-slideDown">
            <SearchBox />
          </div>
        )}

        {/* Tablet Search Bar - Always visible on medium screens */}
        <div className="hidden md:block lg:hidden pb-4">
          <SearchBox />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {openMobileMenu && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setOpenMobileMenu(false)}
          ></div>

          {/* Mobile Menu Panel */}
          <div className="fixed top-16 right-0 bottom-0 w-72 bg-white shadow-2xl z-50 md:hidden animate-slideIn overflow-y-auto">
            <div className="p-6 space-y-1">
              {/* User Section */}
              {userInfo ? (
                <div className="pb-4 mb-4 border-b border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                      <FaUser className="text-white text-lg" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{userInfo.name}</div>
                      <div className="text-sm text-gray-500">Member</div>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setOpenMobileMenu(false)}
                    className="block px-4 py-3 rounded-lg bg-green-50 text-green-700 font-medium hover:bg-green-100 transition-colors"
                  >
                    👤 View Profile
                  </Link>
                </div>
              ) : (
                <div className="pb-4 mb-4 border-b border-gray-200">
                  <Link
                    to="/login"
                    onClick={() => setOpenMobileMenu(false)}
                    className="block px-4 py-3 rounded-lg bg-green-600 text-white font-semibold text-center hover:bg-green-700 transition-colors shadow-sm"
                  >
                    <FaUser className="inline mr-2" />
                    Sign In
                  </Link>
                </div>
              )}

              {/* Navigation Links */}
              <Link
                to="/"
                onClick={() => setOpenMobileMenu(false)}
                className="block px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-green-50 hover:text-green-700 transition-colors"
              >
                🏠 Home
              </Link>
              <Link
                to="/cart"
                onClick={() => setOpenMobileMenu(false)}
                className="block px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-green-50 hover:text-green-700 transition-colors"
              >
                🛒 Cart
                {cartQty > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
                    {cartQty} items
                  </span>
                )}
              </Link>
              <Link
                to="/about"
                onClick={() => setOpenMobileMenu(false)}
                className="block px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-green-50 hover:text-green-700 transition-colors"
              >
                ℹ️ About
              </Link>
              <Link
                to="/contact"
                onClick={() => setOpenMobileMenu(false)}
                className="block px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-green-50 hover:text-green-700 transition-colors"
              >
                📧 Contact
              </Link>

              {/* Logout Button */}
              {userInfo && (
                <button
                  onClick={logoutHandler}
                  className="w-full mt-4 px-4 py-3 rounded-lg bg-red-50 text-red-600 font-medium hover:bg-red-100 transition-colors text-left"
                >
                  🚪 Logout
                </button>
              )}

              {/* Cart Summary */}
              {cartQty > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-xl p-4">
                    <div className="text-sm text-gray-600 mb-1">Cart Total</div>
                    <div className="text-2xl font-bold text-green-700">{cartTotal}</div>
                    <div className="text-sm text-gray-500 mt-1">{cartQty} items</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </header>
  );
};

export default Header;