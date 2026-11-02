import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinkClass = (path) => `
    px-3.5 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 transition duration-200 whitespace-nowrap
    ${isActive(path) 
      ? 'text-[#dc2626] bg-[#fee2e2] font-bold' 
      : 'text-[#475569] hover:text-[#dc2626] hover:bg-[#fef2f2]'}
  `;

  return (
    <nav className="bg-white border-b border-[#edf2f7] sticky top-0 z-50 shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <span className="brand-icon-wrapper">
              <i className="fa-solid fa-heart-pulse text-[#dc2626]"></i>
            </span>
            <span className="brand-text">
              Life<span className="text-[#dc2626]">Drop</span>
            </span>
            {currentUser?.role === 'hospital' && (
              <span className="badge-portal ml-2">Hospital</span>
            )}
            {currentUser?.role === 'receiver' && (
              <span className="badge-portal ml-2">Donor</span>
            )}
          </Link>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none p-2 rounded-md"
              aria-label="Toggle navigation"
            >
              <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1.5">
            {currentUser?.role === 'hospital' ? (
              // Hospital Navigation
              <>
                <Link to="/hospital/dashboard" className={navLinkClass('/hospital/dashboard')}>
                  <i className="fa-solid fa-gauge text-[#94a3b8]"></i> Dashboard
                </Link>
                <Link to="/hospital/stock" className={navLinkClass('/hospital/stock')}>
                  <i className="fa-solid fa-boxes-stacked text-[#94a3b8]"></i> Blood Stock
                </Link>
                <Link to="/hospital/requests" className={navLinkClass('/hospital/requests')}>
                  <i className="fa-solid fa-inbox text-[#94a3b8]"></i> Blood Requests
                </Link>
                <Link to="/hospital/donors" className={navLinkClass('/hospital/donors')}>
                  <i className="fa-solid fa-hand-holding-medical text-[#94a3b8]"></i> Available Donors
                </Link>
                <Link to="/hospital/request-status" className={navLinkClass('/hospital/request-status')}>
                  <i className="fa-solid fa-clock-rotate-left text-[#94a3b8]"></i> Request Status
                </Link>
                <Link to="/hospital/profile" className={navLinkClass('/hospital/profile')}>
                  <i className="fa-solid fa-hospital text-[#dc2626]"></i> Profile
                </Link>
                <button onClick={handleLogout} className="btn-nav-logout ml-2">
                  <i className="fa-solid fa-arrow-right-from-bracket"></i> Log Out
                </button>
              </>
            ) : currentUser?.role === 'receiver' ? (
              // Receiver / Donor Navigation
              <>
                <Link to="/user/dashboard" className={navLinkClass('/user/dashboard')}>
                  <i className="fa-solid fa-gauge text-[#94a3b8]"></i> Dashboard
                </Link>
                <Link to="/user/find-blood" className={navLinkClass('/user/find-blood')}>
                  <i className="fa-solid fa-magnifying-glass text-[#94a3b8]"></i> Find Blood
                </Link>
                <Link to="/user/my-requests" className={navLinkClass('/user/my-requests')}>
                  <i className="fa-solid fa-clipboard-list text-[#94a3b8]"></i> My Requests
                </Link>
                <Link to="/user/donate" className={navLinkClass('/user/donate')}>
                  <i className="fa-solid fa-hand-holding-heart text-[#94a3b8]"></i> Donate Blood
                </Link>
                <Link to="/user/donation-status" className={navLinkClass('/user/donation-status')}>
                  <i className="fa-solid fa-clock-rotate-left text-[#94a3b8]"></i> Donation Status
                </Link>
                <Link to="/user/profile" className={navLinkClass('/user/profile')}>
                  <i className="fa-solid fa-circle-user text-[#dc2626]"></i> Profile
                </Link>
                <button onClick={handleLogout} className="btn-nav-logout ml-2">
                  <i className="fa-solid fa-arrow-right-from-bracket"></i> Log Out
                </button>
              </>
            ) : (
              // Public Guest Navigation
              <>
                <Link to="/" className={navLinkClass('/')}>
                  <i className="fa-solid fa-house text-[#94a3b8]"></i> Home
                </Link>
                <Link to="/guide" className={navLinkClass('/guide')}>
                  <i className="fa-solid fa-droplet text-[#94a3b8]"></i> Blood Guide
                </Link>
                <Link to="/about" className={navLinkClass('/about')}>
                  <i className="fa-solid fa-circle-info text-[#94a3b8]"></i> About Us
                </Link>
                <Link to="/contact" className={navLinkClass('/contact')}>
                  <i className="fa-solid fa-headset text-[#94a3b8]"></i> Contact
                </Link>
                <div className="flex items-center gap-2 ml-4">
                  <Link
                    to="/login"
                    className="border border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626] hover:text-white px-4 py-1.5 rounded-full text-sm font-semibold transition"
                  >
                    <i className="fa-solid fa-arrow-right-to-bracket mr-1"></i> Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-[#dc2626] hover:bg-[#b91c1c] text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm transition"
                  >
                    <i className="fa-solid fa-user-plus mr-1"></i> Register
                  </Link>
                </div>
              </>
            )}
          </div>

        </div>

        {/* Mobile dropdown */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 bg-white space-y-2 px-2">
            {currentUser?.role === 'hospital' ? (
              <>
                <Link onClick={() => setIsOpen(false)} to="/hospital/dashboard" className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600">
                  <i className="fa-solid fa-gauge mr-2 text-gray-400"></i> Dashboard
                </Link>
                <Link onClick={() => setIsOpen(false)} to="/hospital/stock" className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600">
                  <i className="fa-solid fa-boxes-stacked mr-2 text-gray-400"></i> Blood Stock
                </Link>
                <Link onClick={() => setIsOpen(false)} to="/hospital/requests" className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600">
                  <i className="fa-solid fa-inbox mr-2 text-gray-400"></i> Blood Requests
                </Link>
                <Link onClick={() => setIsOpen(false)} to="/hospital/donors" className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600">
                  <i className="fa-solid fa-hand-holding-medical mr-2 text-gray-400"></i> Available Donors
                </Link>
                <Link onClick={() => setIsOpen(false)} to="/hospital/request-status" className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600">
                  <i className="fa-solid fa-clock-rotate-left mr-2 text-gray-400"></i> Request Status
                </Link>
                <Link onClick={() => setIsOpen(false)} to="/hospital/profile" className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600">
                  <i className="fa-solid fa-hospital mr-2 text-red-600"></i> Profile
                </Link>
                <button onClick={() => { setIsOpen(false); handleLogout(); }} className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50">
                  <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i> Log Out
                </button>
              </>
            ) : currentUser?.role === 'receiver' ? (
              <>
                <Link onClick={() => setIsOpen(false)} to="/user/dashboard" className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600">
                  <i className="fa-solid fa-gauge mr-2 text-gray-400"></i> Dashboard
                </Link>
                <Link onClick={() => setIsOpen(false)} to="/user/find-blood" className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600">
                  <i className="fa-solid fa-magnifying-glass mr-2 text-gray-400"></i> Find Blood
                </Link>
                <Link onClick={() => setIsOpen(false)} to="/user/my-requests" className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600">
                  <i className="fa-solid fa-clipboard-list mr-2 text-gray-400"></i> My Requests
                </Link>
                <Link onClick={() => setIsOpen(false)} to="/user/donate" className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600">
                  <i className="fa-solid fa-hand-holding-heart mr-2 text-gray-400"></i> Donate Blood
                </Link>
                <Link onClick={() => setIsOpen(false)} to="/user/donation-status" className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600">
                  <i className="fa-solid fa-clock-rotate-left mr-2 text-gray-400"></i> Donation Status
                </Link>
                <Link onClick={() => setIsOpen(false)} to="/user/profile" className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600">
                  <i className="fa-solid fa-circle-user mr-2 text-red-600"></i> Profile
                </Link>
                <button onClick={() => { setIsOpen(false); handleLogout(); }} className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50">
                  <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i> Log Out
                </button>
              </>
            ) : (
              <>
                <Link onClick={() => setIsOpen(false)} to="/" className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600">
                  <i className="fa-solid fa-house mr-2 text-gray-400"></i> Home
                </Link>
                <Link onClick={() => setIsOpen(false)} to="/guide" className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600">
                  <i className="fa-solid fa-droplet mr-2 text-gray-400"></i> Blood Guide
                </Link>
                <Link onClick={() => setIsOpen(false)} to="/about" className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600">
                  <i className="fa-solid fa-circle-info mr-2 text-gray-400"></i> About Us
                </Link>
                <Link onClick={() => setIsOpen(false)} to="/contact" className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600">
                  <i className="fa-solid fa-headset mr-2 text-gray-400"></i> Contact
                </Link>
                <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                  <Link onClick={() => setIsOpen(false)} to="/login" className="text-center border border-red-600 text-red-600 py-2 rounded-full font-semibold text-sm">
                    Login
                  </Link>
                  <Link onClick={() => setIsOpen(false)} to="/register" className="text-center bg-red-600 text-white py-2 rounded-full font-semibold text-sm">
                    Register
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

