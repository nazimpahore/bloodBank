import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBloodBank } from '../context/BloodBankContext';
import AlertMessage from '../components/AlertMessage';

export default function UserDonatePage() {
  const { currentUser } = useAuth();
  const { communityDonors, addDonorSample, deleteDonorSample } = useBloodBank();

  const [selectedBg, setSelectedBg] = useState(currentUser?.rbg || '');
  const [agreed, setAgreed] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const myListings = communityDonors.filter(item => item.rid === currentUser?.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) return;
    const ok = addDonorSample(selectedBg);
    if (ok) {
      setAgreed(false);
    }
  };

  const handleDelete = (bdid) => {
    if (window.confirm('Are you sure you want to remove your voluntary sample listing?')) {
      deleteDonorSample(bdid);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-6 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
              <i className="fa-solid fa-hand-holding-heart text-red-600"></i> Voluntary Blood Donation
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm mb-0">
              List the blood groups you are willing to donate for patients and certified clinics
            </p>
          </div>
          <Link
            to="/user/dashboard"
            className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-1.5 rounded-full text-xs font-semibold transition flex items-center gap-1.5"
          >
            <i className="fa-solid fa-arrow-left"></i> Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <AlertMessage />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Add Sample Form */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-white border-b border-gray-200 py-4 px-6">
                <h5 className="font-bold text-gray-900 text-base mb-0 flex items-center gap-2">
                  <i className="fa-solid fa-plus-circle text-red-600"></i> Register Donation Offering
                </h5>
              </div>
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">
                      Blood Group You Can Donate
                    </label>
                    <select
                      value={selectedBg}
                      onChange={(e) => setSelectedBg(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition text-sm bg-white"
                    >
                      <option value="" disabled>-- Choose Blood Group --</option>
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

                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-800 flex items-center gap-1.5">
                        <i className="fa-solid fa-shield-heart text-red-600"></i> Voluntary Donor Declaration
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowTerms(!showTerms)}
                        className="text-red-600 font-bold hover:underline cursor-pointer flex items-center gap-1"
                      >
                        {showTerms ? 'Hide' : 'Read'} Terms <i className={`fa-solid fa-chevron-${showTerms ? 'up' : 'down'} text-[10px]`}></i>
                      </button>
                    </div>
                    {showTerms && (
                      <p className="mt-2 pt-2 border-t border-gray-200 text-gray-500 leading-relaxed mb-0">
                        I declare that I am between 18-65 years of age, weigh at least 50kg, have not donated blood in the last 90 days, and do not carry chronic blood-borne conditions according to WHO safety protocols.
                      </p>
                    )}
                  </div>

                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="donorAgree"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      required
                      className="mt-1 accent-red-600 w-4 h-4 rounded cursor-pointer"
                    />
                    <label htmlFor="donorAgree" className="text-xs text-gray-600 font-semibold cursor-pointer select-none">
                      I declare that I am healthy and willing to donate voluntarily
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2"
                  >
                    <i className="fa-solid fa-heart"></i> Register as Available Donor
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Current Listings Table */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center">
                <h5 className="font-bold text-gray-900 text-base mb-0 flex items-center gap-2">
                  <i className="fa-solid fa-layer-group text-red-600"></i> My Active Offerings
                </h5>
                <span className="bg-gray-100 border border-gray-200 text-gray-600 text-xs px-2.5 py-1 rounded-full font-medium">
                  {myListings.length} listed
                </span>
              </div>

              {myListings.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-bold text-gray-700">
                        <th className="py-3 px-6 w-16">#</th>
                        <th className="py-3 px-6">Blood Group</th>
                        <th className="py-3 px-6 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                      {myListings.map((item, idx) => (
                        <tr key={item.bdid || idx} className="hover:bg-gray-50/80 transition">
                          <td className="py-4 px-6 font-bold text-gray-400">{idx + 1}</td>
                          <td className="py-4 px-6">
                            <span className="badge-blood-type text-sm">
                              <i className="fa-solid fa-droplet"></i> {item.bg}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <button
                              onClick={() => handleDelete(item.bdid)}
                              className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-3 py-1 rounded-full text-xs font-semibold transition inline-flex items-center gap-1 cursor-pointer"
                            >
                              <i className="fa-solid fa-trash"></i> Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 px-4">
                  <div className="brand-icon-wrapper w-16 h-16 text-2xl mx-auto mb-3 bg-red-100 text-red-600">
                    <i className="fa-solid fa-hand-holding-heart"></i>
                  </div>
                  <h6 className="font-bold text-gray-800 text-base mb-1">No Samples Offered Yet</h6>
                  <p className="text-gray-500 text-xs max-w-sm mx-auto mb-3">
                    You haven't listed your blood type in the public lifesaver directory.
                  </p>
                  <span className="text-xs text-gray-400">Fill the form to offer your blood group for emergency inquiries.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

