import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AlertMessage from '../components/AlertMessage';

export default function UserDashboard() {
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
              <i className="fa-solid fa-heart"></i> Lifesaver Community Portal
            </span>
            <h2 className="text-3xl font-extrabold mb-2">
              Welcome, {currentUser?.rname || 'Valued Lifesaver'}!
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-0">
              Check available blood in real-time, volunteer your blood sample to help patients, and track all your active requests.
            </p>
          </div>
          <div className="whitespace-nowrap">
            <Link
              to="/user/find-blood"
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition flex items-center gap-2"
            >
              <i className="fa-solid fa-magnifying-glass"></i> Search Available Blood
            </Link>
          </div>
        </div>
      </div>

      {/* Dashboard Shortcut Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Available Blood */}
        <div className="portal-card">
          <div className="portal-icon">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <h5 className="portal-title">Available Blood</h5>
          <p className="portal-desc">
            Explore live hospital blood inventories and request required blood units in one click.
          </p>
          <Link to="/user/find-blood" className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-5 py-2 rounded-full text-xs font-semibold transition flex items-center gap-1.5">
            Search Blood <i className="fa-solid fa-arrow-right text-xs"></i>
          </Link>
        </div>

        {/* My Requests */}
        <div className="portal-card">
          <div className="portal-icon">
            <i className="fa-solid fa-clipboard-list"></i>
          </div>
          <h5 className="portal-title">My Requests</h5>
          <p className="portal-desc">
            Track blood requests sent to hospitals and check real-time acceptance status.
          </p>
          <Link to="/user/my-requests" className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-5 py-2 rounded-full text-xs font-semibold transition flex items-center gap-1.5">
            View Requests <i className="fa-solid fa-arrow-right text-xs"></i>
          </Link>
        </div>

        {/* Donate Blood */}
        <div className="portal-card">
          <div className="portal-icon">
            <i className="fa-solid fa-hand-holding-heart"></i>
          </div>
          <h5 className="portal-title">Donate Blood</h5>
          <p className="portal-desc">
            Register your blood type so nearby hospitals and patients can reach out when needed.
          </p>
          <Link to="/user/donate" className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-5 py-2 rounded-full text-xs font-semibold transition flex items-center gap-1.5">
            Offer Sample <i className="fa-solid fa-arrow-right text-xs"></i>
          </Link>
        </div>

        {/* Donation Status */}
        <div className="portal-card">
          <div className="portal-icon">
            <i className="fa-solid fa-clock-rotate-left"></i>
          </div>
          <h5 className="portal-title">Donation Status</h5>
          <p className="portal-desc">
            Review incoming requests from certified hospitals requesting your blood group.
          </p>
          <Link to="/user/donation-status" className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-5 py-2 rounded-full text-xs font-semibold transition flex items-center gap-1.5">
            Check Status <i className="fa-solid fa-arrow-right text-xs"></i>
          </Link>
        </div>

        {/* User Account */}
        <div className="portal-card">
          <div className="portal-icon">
            <i className="fa-solid fa-circle-user"></i>
          </div>
          <h5 className="portal-title">My Profile</h5>
          <p className="portal-desc">
            Update your contact phone, city, registered blood group, or change account password.
          </p>
          <Link to="/user/profile" className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-5 py-2 rounded-full text-xs font-semibold transition flex items-center gap-1.5">
            Edit Profile <i className="fa-solid fa-arrow-right text-xs"></i>
          </Link>
        </div>

        {/* Logout */}
        <div className="portal-card">
          <div className="portal-icon bg-gray-100 text-gray-700">
            <i className="fa-solid fa-power-off"></i>
          </div>
          <h5 className="portal-title">Log Out</h5>
          <p className="portal-desc">
            Securely sign out of your donor account and return to the public portal homepage.
          </p>
          <button onClick={handleLogout} className="border border-gray-400 text-gray-700 hover:bg-gray-800 hover:text-white px-5 py-2 rounded-full text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer">
            Sign Out <i className="fa-solid fa-arrow-right text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

