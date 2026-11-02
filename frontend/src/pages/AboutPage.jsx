import React from 'react';
import { Link } from 'react-router-dom';
import AlertMessage from '../components/AlertMessage';

export default function AboutPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="bg-gray-100 border border-gray-200 text-red-600 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 mb-3">
            <i className="fa-solid fa-heart-pulse"></i> OUR MISSION
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            About LifeDrop Blood Bank
          </h1>
          <p className="text-gray-500 text-base max-w-2xl mx-auto leading-relaxed">
            Connecting donors, healthcare providers, and patients to ensure safe, swift, and reliable blood access for everyone in need.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <AlertMessage />

        {/* Mission Highlight Section */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-10 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <img
                src="/image/about1.png"
                alt="LifeDrop Team"
                className="w-full max-h-96 rounded-xl shadow-sm object-cover"
              />
            </div>
            <div className="lg:col-span-6">
              <span className="bg-red-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-md inline-block mb-3">
                EVERY LIFE COUNTS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
                "I'm here to save you!"
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                We believe every life matters. Time is the most precious resource during critical medical procedures and emergency transfusions. Our core goal is to make compatible blood available with zero delays, connecting voluntary donors directly with certified medical facilities.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                Through transparency, real-time inventory tracking, and swift notifications, LifeDrop empowers citizens and hospitals to act as one unified lifesaver network.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/register"
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition shadow-sm flex items-center gap-2"
                >
                  <i className="fa-solid fa-user-plus"></i> Register as Donor
                </Link>
                <Link
                  to="/contact"
                  className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-5 py-2.5 rounded-xl font-semibold text-sm transition flex items-center gap-2"
                >
                  <i className="fa-solid fa-envelope"></i> Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Grid */}
        <div className="text-center mb-12">
          <span className="bg-gray-100 border border-gray-200 text-red-600 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">
            CORE VALUES
          </span>
          <h3 className="text-3xl font-extrabold text-gray-900 mt-2">What Guides Everything We Do</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition">
            <div className="portal-icon mx-auto mb-4">
              <i className="fa-solid fa-bolt-lightning"></i>
            </div>
            <h5 className="font-bold text-lg text-gray-900 mb-2">Rapid Response</h5>
            <p className="text-gray-500 text-sm leading-relaxed">
              Real-time status updates allow hospitals and patients to quickly identify and secure required blood types without panic or delay.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition">
            <div className="portal-icon mx-auto mb-4">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <h5 className="font-bold text-lg text-gray-900 mb-2">Safety &amp; Verification</h5>
            <p className="text-gray-500 text-sm leading-relaxed">
              All blood collection follows strict clinical protocols, certified medical screening, and proper cold-chain preservation.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition">
            <div className="portal-icon mx-auto mb-4">
              <i className="fa-solid fa-hand-holding-heart"></i>
            </div>
            <h5 className="font-bold text-lg text-gray-900 mb-2">100% Voluntary</h5>
            <p className="text-gray-500 text-sm leading-relaxed">
              Built upon the generosity of human compassion. Voluntary donors receive the satisfaction of directly saving human lives.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

