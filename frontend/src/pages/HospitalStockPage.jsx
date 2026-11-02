import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBloodBank } from '../context/BloodBankContext';
import AlertMessage from '../components/AlertMessage';

export default function HospitalStockPage() {
  const { currentUser } = useAuth();
  const { bloodStock, addHospitalBlood, deleteHospitalBlood } = useBloodBank();

  const [selectedBg, setSelectedBg] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const myStock = bloodStock.filter(item => item.hid === currentUser?.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) return;
    const ok = addHospitalBlood(selectedBg);
    if (ok) {
      setSelectedBg('');
      setAgreed(false);
    }
  };

  const handleDelete = (bid) => {
    if (window.confirm('Are you sure you want to remove this sample from stock?')) {
      deleteHospitalBlood(bid);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-6 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
              <i className="fa-solid fa-boxes-stacked text-red-600"></i> Hospital Blood Stock
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm mb-0">
              Add available blood groups to your inventory or remove depleted samples
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Add Blood Form */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-white border-b border-gray-200 py-4 px-6">
                <h5 className="font-bold text-gray-900 text-base mb-0 flex items-center gap-2">
                  <i className="fa-solid fa-plus-circle text-red-600"></i> Add Blood Group to Stock
                </h5>
              </div>
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">
                      Select Blood Group
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
                        <i className="fa-solid fa-shield-halved text-blue-600"></i> Quality &amp; Storage Terms
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
                        Blood samples must be certified, tested by a trained phlebotomist/pathologist, stored in verified refrigeration with correct preservatives, and compliant with all statutory blood bank regulations.
                      </p>
                    )}
                  </div>

                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="agreeCheck"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      required
                      className="mt-1 accent-red-600 w-4 h-4 rounded cursor-pointer"
                    />
                    <label htmlFor="agreeCheck" className="text-xs text-gray-600 font-semibold cursor-pointer select-none">
                      I certify that the blood units meet testing &amp; safety criteria
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2"
                  >
                    <i className="fa-solid fa-plus"></i> Add to Blood Stock
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Current Stock Table */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center">
                <h5 className="font-bold text-gray-900 text-base mb-0 flex items-center gap-2">
                  <i className="fa-solid fa-layer-group text-red-600"></i> Current Available Stock
                </h5>
                <span className="bg-gray-100 border border-gray-200 text-gray-600 text-xs px-2.5 py-1 rounded-full font-medium">
                  {myStock.length} units listed
                </span>
              </div>

              {myStock.length > 0 ? (
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
                      {myStock.map((item, idx) => (
                        <tr key={item.bid} className="hover:bg-gray-50/80 transition">
                          <td className="py-4 px-6 font-bold text-gray-400">{idx + 1}</td>
                          <td className="py-4 px-6">
                            <span className="badge-blood-type text-sm">
                              <i className="fa-solid fa-droplet"></i> {item.bg}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <button
                              onClick={() => handleDelete(item.bid)}
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
                    <i className="fa-solid fa-droplet-slash"></i>
                  </div>
                  <h6 className="font-bold text-gray-800 text-base mb-1">No Blood Samples in Stock</h6>
                  <p className="text-gray-500 text-xs max-w-sm mx-auto mb-3">
                    Your hospital currently has no active blood units registered in the system.
                  </p>
                  <span className="text-xs text-gray-400">Use the form on the left to add your first stock unit.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

