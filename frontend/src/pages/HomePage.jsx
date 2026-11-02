import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AlertMessage from '../components/AlertMessage';

export default function HomePage() {
  const { currentUser } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { src: '/image/slide-1.jpg', alt: 'Blood Donation Drive' },
    { src: '/image/cc1.jpg', alt: 'Blood Testing & Processing' },
    { src: '/image/blog-4.png', alt: 'Emergency Medical Delivery' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white py-16 lg:py-20 rounded-b-3xl overflow-hidden mb-12">
        <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full bg-radial from-red-600/20 to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 bg-red-600/15 border border-red-500/30 text-red-300 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-5">
                <i className="fa-solid fa-heart-pulse"></i> Saving Lives 24 Hours a Day
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-5">
                Donate Blood, <br />
                <span className="text-[#dc2626]">Inspire Hope</span> &amp; Save Lives.
              </h1>
              <p className="text-lg text-[#94a3b8] max-w-xl leading-relaxed mb-8">
                LifeDrop bridges voluntary blood donors with hospitals and individuals in critical need. Experience rapid, verified, and transparent blood donation management.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/guide"
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-red-500/25 transition duration-200 flex items-center gap-2"
                >
                  <i className="fa-solid fa-droplet"></i> Blood Compatibility Guide
                </Link>
                {!currentUser ? (
                  <Link
                    to="/register"
                    className="border border-white/40 hover:bg-white hover:text-gray-900 text-white font-semibold px-6 py-3 rounded-xl transition duration-200 flex items-center gap-2"
                  >
                    <i className="fa-solid fa-user-plus"></i> Join as Donor / Hospital
                  </Link>
                ) : (
                  <Link
                    to={currentUser.role === 'hospital' ? '/hospital/dashboard' : '/user/dashboard'}
                    className="border border-white/40 hover:bg-white hover:text-gray-900 text-white font-semibold px-6 py-3 rounded-xl transition duration-200 flex items-center gap-2"
                  >
                    <i className="fa-solid fa-gauge"></i> Go to Dashboard
                  </Link>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 hidden lg:flex justify-center">
              <img
                src="/image/bg.png"
                alt="Donate Blood"
                className="max-h-96 object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)]"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <AlertMessage />

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 -mt-16 sm:-mt-20 relative z-20 mb-12">
          <div className="stat-card">
            <div className="stat-icon bg-[#fee2e2] text-[#dc2626]">
              <i className="fa-solid fa-hand-holding-droplet"></i>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-gray-900 mb-0">100%</h4>
              <span className="text-gray-500 text-xs font-semibold">Voluntary Donors</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon bg-blue-100 text-blue-600">
              <i className="fa-solid fa-hospital"></i>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-gray-900 mb-0">Partnered</h4>
              <span className="text-gray-500 text-xs font-semibold">Certified Hospitals</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon bg-emerald-100 text-emerald-600">
              <i className="fa-solid fa-clock"></i>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-gray-900 mb-0">24 / 7</h4>
              <span className="text-gray-500 text-xs font-semibold">Emergency Support</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon bg-amber-100 text-amber-600">
              <i className="fa-solid fa-shield-heart"></i>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-gray-900 mb-0">Verified</h4>
              <span className="text-gray-500 text-xs font-semibold">Safe Medical Standards</span>
            </div>
          </div>
        </div>

        {/* Featured Carousel */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-16 relative">
          <div className="relative h-64 sm:h-96 md:h-[420px] w-full overflow-hidden">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img src={slide.src} alt={slide.alt} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'w-8 bg-red-600' : 'w-2.5 bg-white/70'
                }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Controls */}
          <button
            onClick={() => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button
            onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>

        {/* How It Works Section */}
        <div className="text-center mb-12">
          <span className="bg-gray-100 text-red-600 border border-gray-200 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">
            SIMPLE PROCESS
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-2 mb-1">How LifeDrop Works</h2>
          <p className="text-gray-500 text-sm">Connecting blood donors and receivers in 3 simple steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition">
            <div className="portal-icon mx-auto mb-4">
              <i className="fa-solid fa-id-card"></i>
            </div>
            <h5 className="font-bold text-lg text-gray-900 mb-2">1. Quick Registration</h5>
            <p className="text-gray-500 text-sm leading-relaxed">
              Hospitals and individual donors create a secure profile in less than 2 minutes with city and contact info.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition">
            <div className="portal-icon mx-auto mb-4">
              <i className="fa-solid fa-magnifying-glass-chart"></i>
            </div>
            <h5 className="font-bold text-lg text-gray-900 mb-2">2. Search or Request</h5>
            <p className="text-gray-500 text-sm leading-relaxed">
              Search real-time availability by blood group (A+, B+, O-, etc.) and directly place or review verified requests.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition">
            <div className="portal-icon mx-auto mb-4">
              <i className="fa-solid fa-heart-circle-check"></i>
            </div>
            <h5 className="font-bold text-lg text-gray-900 mb-2">3. Save a Life</h5>
            <p className="text-gray-500 text-sm leading-relaxed">
              Hospital accepts requests instantly and coordinates safe collection or transfusion. Every second counts!
            </p>
          </div>
        </div>

        {/* About Highlight Section */}
        <div className="bg-gradient-to-r from-white to-red-50/50 border border-red-100 rounded-2xl p-6 sm:p-10 mb-16 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 text-center">
              <img
                src="/image/about1.png"
                alt="LifeDrop Team"
                className="max-h-72 mx-auto rounded-xl shadow-sm object-cover"
              />
            </div>
            <div className="lg:col-span-7">
              <span className="bg-red-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-md inline-block mb-3">
                Our Mission
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
                "I'm here to save you!"
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                We believe every single life counts and every life matters. In medical emergencies, finding compatible blood quickly is the difference between life and loss. LifeDrop digitizes and accelerates blood matching across certified clinics, donors, and receivers.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/about"
                  className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition flex items-center gap-2"
                >
                  <i className="fa-solid fa-book-open"></i> Learn More About Us
                </Link>
                <Link
                  to="/contact"
                  className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition flex items-center gap-2"
                >
                  <i className="fa-solid fa-headset"></i> Contact Coordinators
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Banner Section */}
        <div className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] text-white rounded-2xl p-6 sm:p-10 shadow-lg">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-red-600 text-white font-bold text-xs uppercase px-2 py-0.5 rounded">
                  URGENT
                </span>
                <h4 className="text-2xl font-bold text-white mb-0">Need Blood Urgently?</h4>
              </div>
              <p className="text-gray-400 text-sm">
                Our regional coordinators and active hospitals are accessible 24/7 for prompt assistance.
              </p>
            </div>
            <div>
              <a
                href="tel:+923063071648"
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl shadow transition flex items-center gap-2 whitespace-nowrap"
              >
                <i className="fa-solid fa-phone-flip"></i> Call Helpline Now
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

