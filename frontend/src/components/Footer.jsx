import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-auto bg-[#0f172a] text-white pt-12 pb-6 border-t border-[#334155]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Brand & Mission */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="brand-icon-wrapper">
                <i className="fa-solid fa-heart-pulse text-[#dc2626] text-lg"></i>
              </span>
              <h5 className="m-0 font-bold text-xl text-white">
                Life<span className="text-[#dc2626]">Drop</span>
              </h5>
            </div>
            <p className="text-[#94a3b8] text-sm leading-relaxed mb-4">
              Connecting voluntary blood donors with patients in need and hospitals across the nation. Every donation is a life saved. Safe, transparent, and prompt.
            </p>
            <div className="flex gap-2">
              <a href="#" className="w-9 h-9 rounded-full border border-[#334155] flex items-center justify-center text-white hover:bg-[#dc2626] hover:border-[#dc2626] transition">
                <i className="fa-brands fa-facebook-f text-xs"></i>
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-[#334155] flex items-center justify-center text-white hover:bg-[#dc2626] hover:border-[#dc2626] transition">
                <i className="fa-brands fa-twitter text-xs"></i>
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-[#334155] flex items-center justify-center text-white hover:bg-[#dc2626] hover:border-[#dc2626] transition">
                <i className="fa-brands fa-instagram text-xs"></i>
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-[#334155] flex items-center justify-center text-white hover:bg-[#dc2626] hover:border-[#dc2626] transition">
                <i className="fa-brands fa-linkedin-in text-xs"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h6 className="uppercase font-bold text-sm tracking-wider mb-4 text-[#f1f5f9]">Quick Links</h6>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-[#94a3b8] hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition">
                  <i className="fa-solid fa-chevron-right text-xs text-gray-500"></i> Home
                </Link>
              </li>
              <li>
                <Link to="/guide" className="text-[#94a3b8] hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition">
                  <i className="fa-solid fa-chevron-right text-xs text-gray-500"></i> Blood Guide
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#94a3b8] hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition">
                  <i className="fa-solid fa-chevron-right text-xs text-gray-500"></i> About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#94a3b8] hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition">
                  <i className="fa-solid fa-chevron-right text-xs text-gray-500"></i> Contact Support
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-[#94a3b8] hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition">
                  <i className="fa-solid fa-chevron-right text-xs text-gray-500"></i> Portal Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Emergency Contact */}
          <div>
            <h6 className="uppercase font-bold text-sm tracking-wider mb-4 text-[#f1f5f9]">24/7 Helpline & Emergency</h6>
            <p className="text-sm text-[#94a3b8] mb-3">
              In medical emergency, connect with our instant dispatch coordinator or find nearest blood banks immediately.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 mb-3">
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-phone-volume text-[#dc2626] text-2xl"></i>
                <div>
                  <div className="text-xs text-[#94a3b8] uppercase font-semibold">Muhammad Nazim &bull; Coordinator</div>
                  <a href="tel:+923063071648" className="text-white font-bold text-base hover:text-red-400 transition">
                    +92 306 3071648
                  </a>
                </div>
              </div>
            </div>
            <div className="text-xs text-[#94a3b8] flex items-center gap-1.5">
              <i className="fa-solid fa-envelope text-[#dc2626]"></i>
              <a href="mailto:nazimpahore8@gmail.com" className="hover:text-white transition">nazimpahore8@gmail.com</a>
            </div>
          </div>

        </div>

        <hr className="border-[#334155] my-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#94a3b8]">
          <div className="text-center sm:text-left mb-2 sm:mb-0">
            &copy; {new Date().getFullYear()} <strong className="text-white">LifeDrop Blood Bank Management System</strong>. All rights reserved.
          </div>
          <div className="text-center sm:text-right font-medium text-gray-400">
            <span>Safe &bull; Voluntary &bull; Confidential &bull; Fast</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

