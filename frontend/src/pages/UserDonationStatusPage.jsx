import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBloodBank } from '../context/BloodBankContext';
import AlertMessage from '../components/AlertMessage';

export default function UserDonationStatusPage() {
  const { currentUser } = useAuth();
  const { getUserIncomingDonationInquiries, acceptDonorInquiry, rejectDonorInquiry } = useBloodBank();

  const inquiries = currentUser ? getUserIncomingDonationInquiries(currentUser.id) : [];

  return (
    <div>
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-6 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
              <i className="fa-solid fa-clock-rotate-left text-red-600"></i> Donation Inquiries from Hospitals
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm mb-0">
              Review urgent requests submitted by partner hospitals asking for your registered blood group
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

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center">
            <h5 className="font-bold text-gray-900 text-base mb-0 flex items-center gap-2">
              <i className="fa-solid fa-bell text-red-600"></i> Inbound Hospital Inquiries
            </h5>
            <span className="bg-gray-100 border border-gray-200 text-gray-600 text-xs px-2.5 py-1 rounded-full font-medium">
              {inquiries.length} total inquiries
            </span>
          </div>

          {inquiries.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-bold text-gray-700">
                    <th className="py-3 px-6 w-16">#</th>
                    <th className="py-3 px-6">Hospital Name</th>
                    <th className="py-3 px-6">Blood Group</th>
                    <th className="py-3 px-6">City</th>
                    <th className="py-3 px-6">Contact Email</th>
                    <th className="py-3 px-6">Phone</th>
                    <th className="py-3 px-6">Status</th>
                    <th className="py-3 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {inquiries.map((row, idx) => (
                    <tr key={row.donoid} className="hover:bg-gray-50/80 transition">
                      <td className="py-4 px-6 font-bold text-gray-400">{idx + 1}</td>
                      <td className="py-4 px-6 font-bold text-gray-800">
                        <i className="fa-solid fa-hospital text-red-600 mr-1.5 text-xs"></i>
                        {row.hname}
                      </td>
                      <td className="py-4 px-6">
                        <span className="badge-blood-type">
                          <i className="fa-solid fa-droplet text-xs"></i> {row.bg}
                        </span>
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
                      <td className="py-4 px-6">
                        {row.status === 'Accepted' && (
                          <span className="badge-status badge-status-accepted">
                            <i className="fa-solid fa-circle-check text-emerald-600"></i> Accepted
                          </span>
                        )}
                        {row.status === 'Rejected' && (
                          <span className="badge-status badge-status-rejected">
                            <i className="fa-solid fa-circle-xmark text-red-600"></i> Declined
                          </span>
                        )}
                        {row.status === 'Pending' && (
                          <span className="badge-status badge-status-pending">
                            <i className="fa-solid fa-clock text-amber-600"></i> Awaiting Your Decision
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right">
                        {row.status === 'Pending' ? (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => acceptDonorInquiry(row.donoid)}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm transition inline-flex items-center gap-1 cursor-pointer"
                            >
                              <i className="fa-solid fa-check"></i> Accept
                            </button>
                            <button
                              onClick={() => rejectDonorInquiry(row.donoid)}
                              className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-3.5 py-1.5 rounded-full text-xs font-semibold transition inline-flex items-center gap-1 cursor-pointer"
                            >
                              <i className="fa-solid fa-xmark"></i> Decline
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400 italic">Responded</span>
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
                <i className="fa-solid fa-inbox"></i>
              </div>
              <h6 className="font-bold text-gray-800 text-base mb-1">No Inbound Inquiries</h6>
              <p className="text-gray-500 text-xs max-w-sm mx-auto mb-0">
                No hospitals have sent requests for your blood type at this time.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

