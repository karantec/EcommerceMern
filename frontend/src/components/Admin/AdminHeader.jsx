import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBars, FaTimes, FaChartLine, FaCog } from 'react-icons/fa';
import AdminSidebar from './AdminSidebar';

const AdminHeader = () => {
  const { userInfo } = useSelector(state => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b-2 border-green-500/30 shadow-2xl">
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Brand Section */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link 
              to="/admin/dashboard" 
              className="flex items-center gap-2 sm:gap-3 no-underline group"
            >
              {/* Logo/Icon */}
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <FaChartLine className="text-white text-lg sm:text-xl" />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-green-400 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
              </div>
              
              {/* Brand Text */}
              <div className="leading-tight">
                <div className="text-base sm:text-xl md:text-2xl font-extrabold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
                  FARM SHOP
                </div>
                <div className="text-[10px] sm:text-xs text-green-400 font-semibold tracking-wider uppercase">
                  Admin Dashboard
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop User Info & Actions */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {/* Quick Stats or Actions */}
            <div className="flex items-center gap-3">
              <button className="group p-2.5 rounded-xl bg-gray-800 hover:bg-green-600 border border-gray-700 hover:border-green-500 transition-all duration-300 shadow-lg">
                <FaCog className="text-gray-400 group-hover:text-white group-hover:rotate-90 transition-all duration-300 text-lg" />
              </button>
            </div>

            {/* User Greeting */}
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="text-2xl animate-wave">👋</span>
                <div className="leading-tight">
                  <div className="text-xs text-gray-400 font-medium">Welcome back,</div>
                  <div className="text-sm font-bold text-white">{userInfo?.name || 'Admin'}</div>
                </div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg">
                {userInfo?.name?.charAt(0).toUpperCase() || 'A'}
              </div>
            </div>
          </div>

          {/* Mobile User Info */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile User Avatar */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50">
              <span className="text-lg">👋</span>
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center font-bold text-white text-sm shadow-lg">
                {userInfo?.name?.charAt(0).toUpperCase() || 'A'}
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-gray-800 hover:bg-green-600 border border-gray-700 hover:border-green-500 transition-all duration-300"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <FaTimes className="text-white text-xl" />
              ) : (
                <FaBars className="text-white text-xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          {/* Mobile Menu Panel */}
          <div className="fixed top-16 right-0 bottom-0 w-80 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-2xl z-50 md:hidden animate-slideIn overflow-y-auto border-l-2 border-green-500/30">
            <div className="p-6 space-y-6">
              {/* User Info Card */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 border-green-500/30 shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center font-bold text-white text-2xl shadow-lg">
                    {userInfo?.name?.charAt(0).toUpperCase() || 'A'}
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium mb-1">Logged in as</div>
                    <div className="text-lg font-bold text-white">{userInfo?.name || 'Admin'}</div>
                    <div className="text-xs text-green-400 font-medium">Administrator</div>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-gray-700 hover:bg-green-600 rounded-xl text-white text-sm font-semibold transition-colors">
                    Profile
                  </button>
                  <button className="flex-1 px-3 py-2 bg-gray-700 hover:bg-green-600 rounded-xl text-white text-sm font-semibold transition-colors">
                    Settings
                  </button>
                </div>
              </div>

              {/* Sidebar Content */}
              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">
                  Navigation
                </h3>
                <AdminSidebar onNavigate={() => setMobileMenuOpen(false)} />
              </div>

              {/* Status Indicator */}
              <div className="mt-auto pt-6 border-t border-gray-700">
                <div className="flex items-center gap-2 px-3 py-2 bg-green-500/10 rounded-xl border border-green-500/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400 font-medium">System Online</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes wave {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(20deg);
          }
          75% {
            transform: rotate(-20deg);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }

        .animate-wave {
          display: inline-block;
          animation: wave 2s ease-in-out infinite;
        }
      `}</style>
    </header>
  );
};

export default AdminHeader