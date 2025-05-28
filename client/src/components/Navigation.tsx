import React from "react";
import { Link } from "react-router-dom";

interface NavigationProps {
  cartCount: number;
  onCartOpen: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ cartCount, onCartOpen }) => {
  return (
    <>
      {/* Top header - announcement bar */}
      <div className="bg-indigo-600 py-2">
        <div className="container mx-auto px-4 text-center text-white text-sm font-medium">
          Free shipping on orders over $50 • 30-day money-back guarantee
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur-md border-gray-200">
        <div className="container mx-auto px-4">
          {/* Top nav with search, account, cart */}
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-indigo-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span className="text-xl font-bold">ShopEase</span>
            </Link>

            {/* Search */}
            <div className="hidden md:flex relative w-full max-w-md mx-4">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full py-2 pl-10 pr-4 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Test Store Link */}
              <a
                href="#"
                className="flex items-center text-amber-600 hover:text-amber-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className="ml-2 text-sm font-medium hidden sm:inline">
                  Test Stores
                </span>
              </a>

              {/* Account */}
              <Link
                to="/account"
                className="flex items-center text-gray-700 hover:text-indigo-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="ml-2 text-sm font-medium hidden sm:inline">
                  Account
                </span>
              </Link>

              {/* Wishlist */}
              <a
                href="#"
                className="flex items-center text-gray-700 hover:text-indigo-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span className="ml-2 text-sm font-medium hidden sm:inline">
                  Wishlist
                </span>
              </a>

              {/* Cart */}
              <button
                onClick={onCartOpen}
                className="flex items-center text-gray-700 hover:text-indigo-600 relative"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13v6a2 2 0 002 2h7a2 2 0 002-2v-6M9 9h6"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
                <span className="ml-2 text-sm font-medium hidden sm:inline">
                  Cart
                </span>
              </button>
            </div>
          </div>

          {/* Main Navigation Menu */}
          <nav className="py-4 border-t border-gray-200">
            <div className="flex items-center space-x-8 text-sm font-medium">
              <Link
                to="/"
                className="text-gray-900 hover:text-indigo-600 pb-2 border-b-2 border-indigo-600"
              >
                All Products
              </Link>
              <a
                href="#"
                className="text-gray-700 hover:text-indigo-600 pb-2 border-b-2 border-transparent"
              >
                Electronics
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-indigo-600 pb-2 border-b-2 border-transparent"
              >
                Fashion
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-indigo-600 pb-2 border-b-2 border-transparent"
              >
                Home & Garden
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-indigo-600 pb-2 border-b-2 border-transparent"
              >
                Beauty
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-indigo-600 pb-2 border-b-2 border-transparent"
              >
                Sports & Outdoors
              </a>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navigation;
