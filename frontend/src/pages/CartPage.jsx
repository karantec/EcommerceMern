import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import Meta from '../components/Meta';
import { addCurrency } from '../utils/addCurrency';

const EMPTY_CART_IMG = '/mnt/data/46d20c0a-e4ff-475b-8932-41ebcea54362.png';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  const itemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  return (
    <>
      <Meta title={'Shopping Cart'} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Items list */}
          <div className="lg:col-span-8 space-y-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-6 p-8 bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-md rounded-2xl border border-gray-100 shadow-lg">
                <img
                  src={EMPTY_CART_IMG}
                  alt="Empty cart"
                  className="w-56 h-56 object-contain"
                />
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-800">Your cart is feeling lonely</h2>
                  <p className="mt-2 text-gray-500">Looks like you haven't added anything yet.</p>
                  <Link to="/" className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg shadow hover:scale-[1.02] transition transform">
                    Shop fresh items
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <article
                    key={item._id}
                    className="flex flex-col sm:flex-row items-start gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition"
                  >
                    <Link to={`/product/${item._id}`} className="w-full sm:w-36 h-28 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3">
                        <Link to={`/product/${item._id}`} className="text-lg font-semibold text-gray-900 hover:underline truncate">
                          {item.name}
                        </Link>
                        <div className="ml-auto text-sm text-gray-500">Qty: {item.qty}</div>
                      </div>

                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">{item.description || ''}</p>

                      <div className="mt-4 flex items-center gap-4 flex-wrap">
                        <div className="text-xl font-bold text-gray-900">{addCurrency(item.price)}</div>

                        {/* Quantity selector (fancier) */}
                        <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                          <label htmlFor={`qty-${item._id}`} className="sr-only">Quantity</label>
                          <select
                            id={`qty-${item._id}`}
                            value={item.qty}
                            onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                            className="appearance-none px-3 py-2 text-sm bg-transparent focus:outline-none"
                          >
                            {Array.from({ length: item.countInStock }, (_, i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                          </select>
                        </div>

                        <button
                          onClick={() => removeFromCartHandler(item._id)}
                          className="ml-auto inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                          title={`Remove ${item.name}`}
                          aria-label={`Remove ${item.name}`}
                        >
                          <FaTrash />
                          <span className="hidden sm:inline text-sm">Remove</span>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Right: Summary */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-100 p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Order summary</h3>
                    <p className="text-sm text-gray-400 mt-1">Review your items and proceed to checkout</p>
                  </div>
                  <div className="text-sm text-gray-500">{itemsCount} {itemsCount === 1 ? 'item' : 'items'}</div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">Subtotal</div>
                    <div className="text-lg font-semibold text-gray-900">{addCurrency(subtotal)}</div>
                  </div>

                  {/* placeholder for discounts / shipping (kept minimal) */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Estimated shipping</span>
                    <span>Calculated at checkout</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Taxes</span>
                    <span>Included</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-lg shadow-md hover:scale-[1.01] transition transform disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                    aria-disabled={cartItems.length === 0}
                  >
                    Proceed to Checkout
                    <span className="ml-2 text-sm font-medium">{addCurrency(subtotal)}</span>
                  </button>
                </div>

                <div className="mt-4 text-center">
                  <Link to="/" className="text-sm text-green-600 hover:underline">Continue shopping</Link>
                </div>
              </div>

              {/* Helpful small card: savings / tip */}
              {cartItems.length > 0 && (
                <div className="mt-4 p-4 bg-gradient-to-br from-green-50 to-white rounded-lg border border-green-100 text-sm text-gray-700">
                  <strong>Tip:</strong> Use coupon codes at checkout to save more. We also provide free returns within 14 days.
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default CartPage;
