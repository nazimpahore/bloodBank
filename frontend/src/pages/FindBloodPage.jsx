import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBloodBank } from '../context/BloodBankContext';
import AlertMessage from '../components/AlertMessage';

export default function FindBloodPage() {
  const { currentUser } = useAuth();
  const { getFullBloodStock, requestHospitalBlood } = useBloodBank();
  const [searchParams, setSearchParams] = useSearchParams();

  const filterBg = searchParams.get('bg') || searchParams.get('search') || '';
  const [selectedFilter, setSelectedFilter] = useState(filterBg);

  const stock = getFullBloodStock(filterBg);
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    if (selectedFilter) {
      setSearchParams({ search: selectedFilter });
    } else {
      setSearchParams({});
    }
  };

  const handleReset = () => {
    setSelectedFilter('');
    setSearchParams({});
  };

  const handleRequest = (bid, hid, bg) => {
    requestHospitalBlood(bid, hid, bg);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-6 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
              <i className="fa-solid fa-magnifying-glass text-red-600"></i> Find Available Blood
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm mb-0">
              Browse real-time blood stock registered by partner hospitals across cities
            </p>
          </div>
          {currentUser?.role === 'receiver' && (
            <Link
              to="/user/dashboard"
              className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-1.5 rounded-full text-xs font-semibold transition flex items-center gap-1.5"
            >
              <i className="fa-solid fa-arrow-left"></i> Dashboard
            </Link>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <AlertMessage />

        {/* Filter Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-8">
          <form onSubmit={handleFilterSubmit} className="flex flex-col md:flex-row items-end gap-4">
            <div className="w-full md:w-72">
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">
                <i className="fa-solid fa-filter text-red-600 mr-1"></i> Filter by Blood Group:
              </label>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition text-sm bg-white"
              >
                <option value="">All Blood Groups</option>
                {bloodGroups.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm shadow-sm transition flex items-center gap-1.5 cursor-pointer"
              >
                <i className="fa-solid fa-magnifying-glass"></i> Search
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold px-4 py-2.5 rounded-xl text-sm transition flex items-center gap-1.5 cursor-pointer"
              >
                <i className="fa-solid fa-rotate-left"></i> Reset Filter
              </button>
            </div>
          </form>
        </div>

        {/* Stock Table Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center">
            <h5 className="font-bold text-gray-900 text-base mb-0 flex items-center gap-2">
              <i className="fa-solid fa-hospital text-red-600"></i> Verified Hospital Stock
            </h5>
            <span className="bg-gray-100 border border-gray-200 text-gray-600 text-xs px-2.5 py-1 rounded-full font-medium">
              {stock.length} units available
            </span>
          </div>

          {stock.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-bold text-gray-700">
                    <th className="py-3 px-6 w-16">#</th>
                    <th className="py-3 px-6">Blood Group</th>
                    <th className="py-3 px-6">Hospital Name</th>
                    <th className="py-3 px-6">City</th>
                    <th className="py-3 px-6">Contact Email</th>
                    <th className="py-3 px-6">Phone</th>
                    <th className="py-3 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {stock.map((row, idx) => (
                    <tr key={row.bid || idx} className="hover:bg-gray-50/80 transition">
                      <td className="py-4 px-6 font-bold text-gray-400">{idx + 1}</td>
                      <td className="py-4 px-6">
                        <span className="badge-blood-type">
                          <i className="fa-solid fa-droplet text-xs"></i> {row.bg}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-bold text-gray-800">
                        <i className="fa-solid fa-hospital text-red-600 mr-1.5 text-xs"></i>
                        {row.hname}
                      </td>
                      <td className="py-4 px-6">
                        <span className="city-badge">
                          <i className="fa-solid fa-location-dot text-gray-400"></i> {row.hcity}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <a href={`mailto:${row.hemail}`} className="contact-pill contact-pill-email">
                          <i className="fa-solid fa-envelope"></i>
                          <span>{row.hemail}</span>
                        </a>
                      </td>
                      <td className="py-4 px-6">
                        <a href={`tel:${row.hphone}`} className="contact-pill contact-pill-phone">
                          <i className="fa-solid fa-phone"></i>
                          <span>{row.hphone}</span>
                        </a>
                      </td>
                      <td className="py-4 px-6 text-right">
                        {currentUser?.role === 'hospital' ? (
                          <button
                            onClick={() => alert('Hospital accounts cannot request blood samples. Please log in as an individual user/patient.')}
                            className="border border-gray-300 text-gray-400 bg-gray-50 px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-not-allowed"
                          >
                            <i className="fa-solid fa-ban mr-1"></i> Hospital Account
                          </button>
                        ) : currentUser?.role === 'receiver' ? (
                          <button
                            onClick={() => handleRequest(row.bid, row.hid, row.bg)}
                            className="btn-request-blood"
                          >
                            <i className="fa-solid fa-hand-holding-droplet"></i> Request Blood
                          </button>
                        ) : (
                          <Link
                            to="/login"
                            className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-3.5 py-1.5 rounded-full text-xs font-semibold transition"
                          >
                            Login to Request
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 px-4">
              <div className="brand-icon-wrapper w-16 h-16 text-2xl mx-auto mb-3 bg-red-100 text-red-600">
                <i className="fa-solid fa-circle-exclamation text-red-600"></i>
              </div>
              <h6 className="font-bold text-gray-800 text-base mb-1">No Blood Units Found</h6>
              <p className="text-gray-500 text-xs max-w-sm mx-auto mb-0">
                {filterBg
                  ? `No hospital currently has blood type ${filterBg} listed. Try resetting your filter.`
                  : 'No hospitals have registered blood units in the system at this time.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

