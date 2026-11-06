import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AlertMessage from '../components/AlertMessage';

export default function LoginPage() {
  const { currentUser, loginHospital, loginReceiver } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('hospital'); // 'hospital' or 'user'
  
  // Hospital fields
  const [hemail, setHemail] = useState('');
  const [hpassword, setHpassword] = useState('');
  const [showHPassword, setShowHPassword] = useState(false);

  // User fields
  const [remail, setRemail] = useState('');
  const [rpassword, setRpassword] = useState('');
  const [showRPassword, setShowRPassword] = useState(false);

  useEffect(() => {
    if (currentUser?.role === 'hospital') {
      navigate('/hospital/dashboard');
    } else if (currentUser?.role === 'receiver') {
      navigate('/user/dashboard');
    }
  }, [currentUser, navigate]);

  const handleHospitalSubmit = (e) => {
    e.preventDefault();
    const success = loginHospital(hemail, hpassword);
    if (success) {
      navigate('/hospital/dashboard');
    }
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    const success = loginReceiver(remail, rpassword);
    if (success) {
      navigate('/user/dashboard');
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <AlertMessage />

        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="text-center pt-8 pb-4 px-6">
            <div className="brand-icon-wrapper w-14 h-14 text-2xl mx-auto mb-3 bg-red-100 text-red-600">
              <i className="fa-solid fa-lock"></i>
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-1">Account Login</h4>
            <p className="text-gray-500 text-xs sm:text-sm">Select your account type to access your dashboard</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 bg-gray-50/70 p-1.5 gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('hospital')}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'hospital'
                  ? 'bg-white text-red-600 shadow-sm border-b-2 border-red-600'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <i className="fa-solid fa-hospital"></i> Hospital / Clinic
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('user')}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'user'
                  ? 'bg-white text-red-600 shadow-sm border-b-2 border-red-600'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <i className="fa-solid fa-user"></i> Individual / Donor
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8">
            {activeTab === 'hospital' ? (
              <form onSubmit={handleHospitalSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">
                    <i className="fa-solid fa-envelope text-red-600 mr-1"></i> Hospital Registered Email
                  </label>
                  <input
                    type="email"
                    value={hemail}
                    onChange={(e) => setHemail(e.target.value)}
                    placeholder="hospital@domain.org"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition text-sm"
                    required
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-gray-600 uppercase">
                      <i className="fa-solid fa-key text-red-600 mr-1"></i> Password
                    </label>
                    <Link
                      to="/forgot-password?role=hospital"
                      className="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type={showHPassword ? 'text' : 'password'}
                      value={hpassword}
                      onChange={(e) => setHpassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 pr-10 rounded-xl border border-gray-200 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition text-sm"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowHPassword(!showHPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                      title={showHPassword ? 'Hide password' : 'Show password'}
                    >
                      <i className={`fa-solid ${showHPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <i className="fa-solid fa-right-to-bracket"></i> Login as Hospital
                </button>
              </form>
            ) : (
              <form onSubmit={handleUserSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">
                    <i className="fa-solid fa-envelope text-red-600 mr-1"></i> User / Donor Email
                  </label>
                  <input
                    type="email"
                    value={remail}
                    onChange={(e) => setRemail(e.target.value)}
                    placeholder="user@domain.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition text-sm"
                    required
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-gray-600 uppercase">
                      <i className="fa-solid fa-key text-red-600 mr-1"></i> Password
                    </label>
                    <Link
                      to="/forgot-password?role=user"
                      className="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type={showRPassword ? 'text' : 'password'}
                      value={rpassword}
                      onChange={(e) => setRpassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 pr-10 rounded-xl border border-gray-200 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition text-sm"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowRPassword(!showRPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                      title={showRPassword ? 'Hide password' : 'Show password'}
                    >
                      <i className={`fa-solid ${showRPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <i className="fa-solid fa-right-to-bracket"></i> Login as User / Donor
                </button>
              </form>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 border-t border-gray-200 text-center py-4 px-6 text-xs text-gray-500">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-bold text-red-600 hover:underline">
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
