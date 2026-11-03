import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AlertMessage from '../components/AlertMessage';

export default function HospitalDashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <AlertMessage />

      {/* Welcome Hero Banner */}
      <div className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white rounded-3xl p-8 sm:p-12 mb-10 shadow-lg">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="bg-red-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-md inline-flex items-center gap-1.5 mb-3">
              <i className="fa-solid fa-hospital"></i> Healthcare Management Center
            </span>
            <h2 className="text-3xl font-extrabold mb-2">
              {currentUser?.hname || 'Hospital Administration'} Dashboard
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-0">
              Monitor incoming patient blood requests, update internal inventory, and request community donor contributions in real-time.
            </p>
          </div>
          <div className="whitespace-nowrap">
            <Link
              to="/hospital/stock"
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition flex items-center gap-2"
            >
              <i className="fa-solid fa-plus-circle"></i> Add Blood Stock
            </Link>
          </div>
        </div>
      </div>

      {/* Dashboard Shortcut Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Blood Stock */}
        <div className="portal-card group">
          <div className="absolute inset-0 bg-gradient-to-b from-red-50/0 via-transparent to-red-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          <div className="portal-icon">
            <i className="fa-solid fa-boxes-stacked"></i>
          </div>
          <h5 className="portal-title">Stock of Blood</h5>
          <p className="portal-desc">
            Add and manage blood groups currently available in your clinic or hospital bank.
          </p>
          <Link
            to="/hospital/stock"
            className="relative z-10 inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-red-600 bg-red-50/80 border border-red-200 group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-red-600 group-hover:text-white group-hover:border-transparent group-hover:shadow-md group-hover:shadow-red-500/25 transition-all duration-300"
          >
            <span>Manage Stock</span>
            <i className="fa-solid fa-arrow-right text-[11px] transition-transform duration-300 group-hover:translate-x-1"></i>
          </Link>
        </div>

        {/* Blood Requests */}
        <div className="portal-card group">
          <div className="absolute inset-0 bg-gradient-to-b from-red-50/0 via-transparent to-red-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          <div className="portal-icon">
            <i className="fa-solid fa-inbox"></i>
          </div>
          <h5 className="portal-title">Blood Requests</h5>
          <p className="portal-desc">
            Review urgent requests submitted by patients and accept or reject matching donations.
          </p>
          <Link
            to="/hospital/requests"
            className="relative z-10 inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-red-600 bg-red-50/80 border border-red-200 group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-red-600 group-hover:text-white group-hover:border-transparent group-hover:shadow-md group-hover:shadow-red-500/25 transition-all duration-300"
          >
            <span>View Requests</span>
            <i className="fa-solid fa-arrow-right text-[11px] transition-transform duration-300 group-hover:translate-x-1"></i>
          </Link>
        </div>

        {/* Available Donors */}
        <div className="portal-card group">
          <div className="absolute inset-0 bg-gradient-to-b from-red-50/0 via-transparent to-red-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          <div className="portal-icon">
            <i className="fa-solid fa-hand-holding-medical"></i>
          </div>
          <h5 className="portal-title">Available Donors</h5>
          <p className="portal-desc">
            Search registered voluntary donors willing to donate samples for your hospital.
          </p>
          <Link
            to="/hospital/donors"
            className="relative z-10 inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-red-600 bg-red-50/80 border border-red-200 group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-red-600 group-hover:text-white group-hover:border-transparent group-hover:shadow-md group-hover:shadow-red-500/25 transition-all duration-300"
          >
            <span>Browse Donors</span>
            <i className="fa-solid fa-arrow-right text-[11px] transition-transform duration-300 group-hover:translate-x-1"></i>
          </Link>
        </div>

        {/* Request Status */}
        <div className="portal-card group">
          <div className="absolute inset-0 bg-gradient-to-b from-red-50/0 via-transparent to-red-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          <div className="portal-icon">
            <i className="fa-solid fa-clock-rotate-left"></i>
          </div>
          <h5 className="portal-title">Request Status</h5>
          <p className="portal-desc">
            Track status of requests your hospital sent to registered community donors.
          </p>
          <Link
            to="/hospital/request-status"
            className="relative z-10 inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-red-600 bg-red-50/80 border border-red-200 group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-red-600 group-hover:text-white group-hover:border-transparent group-hover:shadow-md group-hover:shadow-red-500/25 transition-all duration-300"
          >
            <span>Check Status</span>
            <i className="fa-solid fa-arrow-right text-[11px] transition-transform duration-300 group-hover:translate-x-1"></i>
          </Link>
        </div>

        {/* Hospital Account */}
        <div className="portal-card group">
          <div className="absolute inset-0 bg-gradient-to-b from-red-50/0 via-transparent to-red-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          <div className="portal-icon">
            <i className="fa-solid fa-id-card"></i>
          </div>
          <h5 className="portal-title">Hospital Profile</h5>
          <p className="portal-desc">
            Update hospital facility information, emergency contact number, and login credentials.
          </p>
          <Link
            to="/hospital/profile"
            className="relative z-10 inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-red-600 bg-red-50/80 border border-red-200 group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-red-600 group-hover:text-white group-hover:border-transparent group-hover:shadow-md group-hover:shadow-red-500/25 transition-all duration-300"
          >
            <span>Edit Profile</span>
            <i className="fa-solid fa-arrow-right text-[11px] transition-transform duration-300 group-hover:translate-x-1"></i>
          </Link>
        </div>

        {/* Logout */}
        <div className="portal-card group">
          <div className="absolute inset-0 bg-gradient-to-b from-red-50/0 via-transparent to-red-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          <div className="portal-icon">
            <i className="fa-solid fa-power-off"></i>
          </div>
          <h5 className="portal-title">Log Out</h5>
          <p className="portal-desc">
            Securely terminate your hospital session and return to the main homepage.
          </p>
          <button
            onClick={handleLogout}
            className="relative z-10 inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-red-600 bg-red-50/80 border border-red-200 group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-red-600 group-hover:text-white group-hover:border-transparent group-hover:shadow-md group-hover:shadow-red-500/25 transition-all duration-300 cursor-pointer"
          >
            <span>Sign Out</span>
            <i className="fa-solid fa-arrow-right text-[11px] transition-transform duration-300 group-hover:translate-x-1"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

