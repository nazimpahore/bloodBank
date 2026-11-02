import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AlertMessage from '../components/AlertMessage';

export default function HospitalProfilePage() {
  const { currentUser, updateHospitalProfile } = useAuth();

  const [hname, setHname] = useState(currentUser?.hname || '');
  const [hcity, setHcity] = useState(currentUser?.hcity || '');
  const [hphone, setHphone] = useState(currentUser?.hphone || '');
  const [hpassword, setHpassword] = useState(currentUser?.hpassword || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    updateHospitalProfile({ hname, hcity, hphone, hpassword });
  };

  return (
    <div>
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-6 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
              <i className="fa-solid fa-hospital text-red-600"></i> Hospital Profile Settings
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm mb-0">
              Manage facility registration details and contact information
            </p>
          </div>
          <Link
            to="/hospital/dashboard"
            className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-1.5 rounded-full text-xs font-semibold transition flex items-center gap-1.5"
          >
            <i className="fa-solid fa-arrow-left"></i> Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <AlertMessage />

        <div className="max-w-xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
            <div className="bg-white border-b border-gray-200 py-6 px-8 text-center">
              <div className="brand-icon-wrapper w-14 h-14 text-2xl mx-auto mb-3 bg-red-100 text-red-600">
                <i className="fa-solid fa-hospital"></i>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-1">Edit Hospital Information</h4>
              <p className="text-gray-500 text-xs">Keep your contact numbers up-to-date for emergency patients</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">
                  <i className="fa-solid fa-hospital text-red-600 mr-1"></i> Hospital Name
                </label>
                <input
                  type="text"
                  value={hname}
                  onChange={(e) => setHname(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">
                  <i className="fa-solid fa-envelope text-red-600 mr-1"></i> Registered Email (Fixed)
                </label>
                <input
                  type="email"
                  value={currentUser?.hemail || ''}
                  disabled
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">
                    <i className="fa-solid fa-location-dot text-red-600 mr-1"></i> City
                  </label>
                  <input
                    type="text"
                    value={hcity}
                    onChange={(e) => setHcity(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">
                    <i className="fa-solid fa-phone text-red-600 mr-1"></i> Phone Helpline
                  </label>
                  <input
                    type="tel"
                    value={hphone}
                    onChange={(e) => setHphone(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">
                  <i className="fa-solid fa-key text-red-600 mr-1"></i> Password
                </label>
                <input
                  type="password"
                  value={hpassword}
                  onChange={(e) => setHpassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <i className="fa-solid fa-floppy-disk"></i> Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

