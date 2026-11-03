import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AlertMessage from '../components/AlertMessage';

export default function RegisterPage() {
  const { currentUser, registerHospital, registerReceiver } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('hospital');

  // Hospital fields
  const [hname, setHname] = useState('');
  const [hcity, setHcity] = useState('');
  const [hphone, setHphone] = useState('');
  const [hemail, setHemail] = useState('');
  const [hpassword, setHpassword] = useState('');

  // User fields
  const [rname, setRname] = useState('');
  const [rbg, setRbg] = useState('');
  const [rcity, setRcity] = useState('');
  const [rphone, setRphone] = useState('');
  const [remail, setRemail] = useState('');
  const [rpassword, setRpassword] = useState('');

  useEffect(() => {
    if (currentUser?.role === 'hospital') {
      navigate('/hospital/dashboard');
    } else if (currentUser?.role === 'receiver') {
      navigate('/user/dashboard');
    }
  }, [currentUser, navigate]);

  const handleHospitalSubmit = (e) => {
    e.preventDefault();
    const ok = registerHospital({ hname, hemail, hpassword, hphone, hcity });
    if (ok) {
      navigate('/hospital/dashboard');
    }
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    const ok = registerReceiver({ rname, remail, rpassword, rphone, rbg, rcity });
    if (ok) {
      navigate('/user/dashboard');
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg">
        <AlertMessage />

        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="text-center pt-8 pb-4 px-6">
            <div className="brand-icon-wrapper w-14 h-14 text-2xl mx-auto mb-3 bg-red-100 text-red-600">
              <i className="fa-solid fa-user-plus"></i>
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-1">Create an Account</h4>
            <p className="text-gray-500 text-xs sm:text-sm">Register as a certified hospital or voluntary donor/receiver</p>
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
              <i className="fa-solid fa-user"></i> User / Donor
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8">
            {activeTab === 'hospital' ? (
              <form onSubmit={handleHospitalSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">
                    <i className="fa-solid fa-hospital text-red-600 mr-1"></i> Hospital / Clinic Name
                  </label>
                  <input
                    type="text"
                    value={hname}
                    onChange={(e) => setHname(e.target.value)}
                    placeholder="e.g. City General Hospital"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition text-sm"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">
                      <i className="fa-solid fa-location-dot text-red-600 mr-1"></i> City / Location
                    </label>
                    <input
                      type="text"
                      value={hcity}
                      onChange={(e) => setHcity(e.target.value)}
                      placeholder="City"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">
                      <i className="fa-solid fa-phone text-red-600 mr-1"></i> Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={hphone}
                      onChange={(e) => setHphone(e.target.value)}
                      placeholder="11 Digits"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition text-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">
                    <i className="fa-solid fa-envelope text-red-600 mr-1"></i> Hospital Email Address
                  </label>
                  <input
                    type="email"
                    value={hemail}
                    onChange={(e) => setHemail(e.target.value)}
                    placeholder="admin@hospital.org"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">
                    <i className="fa-solid fa-key text-red-600 mr-1"></i> Secure Password (min 6 characters)
                  </label>
                  <input
                    type="password"
                    value={hpassword}
                    onChange={(e) => setHpassword(e.target.value)}
                    placeholder="••••••••"
                    minLength={6}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition text-sm"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-check"></i> Register Hospital
                </button>
              </form>
            ) : (
              <form onSubmit={handleUserSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">
                    <i className="fa-solid fa-user text-red-600 mr-1"></i> Full Name
                  </label>
                  <input
                    type="text"
                    value={rname}
                    onChange={(e) => setRname(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition text-sm"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">
                      <i className="fa-solid fa-droplet text-red-600 mr-1"></i> Blood Group
                    </label>
                    <select
                      value={rbg}
                      onChange={(e) => setRbg(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition text-sm bg-white"
                      required
                    >
                      <option value="" disabled>Select Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">
                      <i className="fa-solid fa-location-dot text-red-600 mr-1"></i> City
                    </label>
                    <input
                      type="text"
                      value={rcity}
                      onChange={(e) => setRcity(e.target.value)}
                      placeholder="City"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition text-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">
                    <i className="fa-solid fa-phone text-red-600 mr-1"></i> Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={rphone}
                    onChange={(e) => setRphone(e.target.value)}
                    placeholder="11 Digits"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">
                    <i className="fa-solid fa-envelope text-red-600 mr-1"></i> Email Address
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
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">
                    <i className="fa-solid fa-key text-red-600 mr-1"></i> Secure Password (min 6 characters)
                  </label>
                  <input
                    type="password"
                    value={rpassword}
                    onChange={(e) => setRpassword(e.target.value)}
                    placeholder="••••••••"
                    minLength={6}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition text-sm"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-check"></i> Register as Donor/User
                </button>
              </form>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 border-t border-gray-200 text-center py-4 px-6 text-xs text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-red-600 hover:underline">
              Login Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

