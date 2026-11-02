import React from 'react';
import AlertMessage from '../components/AlertMessage';

export default function ContactPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="bg-gray-100 border border-gray-200 text-red-600 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 mb-3">
            <i className="fa-solid fa-headset"></i> SUPPORT &amp; EMERGENCY
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            Get in Touch With Us
          </h1>
          <p className="text-gray-500 text-base max-w-2xl mx-auto leading-relaxed">
            Have an urgent blood requirement, technical question, or wish to partner your hospital? Reach our dedicated coordinator directly.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <AlertMessage />

        {/* Emergency Banner Card */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-2xl p-6 sm:p-10 mb-12 shadow-lg">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <span className="bg-white text-red-600 font-bold text-xs uppercase px-3 py-1 rounded-md inline-block mb-3">
                24/7 EMERGENCY HELPLINE
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-2">Critical Medical Need?</h3>
              <p className="text-white/80 text-sm max-w-xl">
                In life-threatening situations requiring immediate blood units, reach out to our primary emergency coordinator right away.
              </p>
            </div>
            <div>
              <a
                href="tel:+923063071648"
                className="bg-white text-red-600 hover:bg-gray-100 font-bold px-6 py-3 rounded-xl shadow transition flex items-center gap-2 whitespace-nowrap text-lg"
              >
                <i className="fa-solid fa-phone-volume"></i> +92 306 3071648
              </a>
            </div>
          </div>
        </div>

        {/* Official Coordinator Card */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-center">
            <div className="brand-icon-wrapper w-20 h-20 text-3xl mx-auto mb-4 bg-red-100 text-red-600">
              <i className="fa-solid fa-user-shield"></i>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-1">Muhammad Nazim</h3>
            <span className="inline-block bg-gray-100 border border-gray-200 text-red-600 font-bold text-xs px-3.5 py-1 rounded-full mb-3">
              Lead Coordinator &amp; Emergency Contact
            </span>
            <p className="text-gray-500 text-sm mb-6">
              Available 24/7 for donor coordination, patient inquiries, and hospital emergency requests.
            </p>

            <hr className="border-gray-100 my-6" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <small className="text-gray-400 block font-bold uppercase text-xs mb-1.5">Direct Phone</small>
                <a
                  href="tel:+923063071648"
                  className="contact-pill contact-pill-phone py-2 px-4 justify-center w-full"
                >
                  <i className="fa-solid fa-phone"></i>
                  <span>+92 306 3071648</span>
                </a>
              </div>
              <div>
                <small className="text-gray-400 block font-bold uppercase text-xs mb-1.5">Official Email</small>
                <a
                  href="mailto:nazimpahore8@gmail.com"
                  className="contact-pill contact-pill-email py-2 px-4 justify-center w-full"
                >
                  <i className="fa-solid fa-envelope"></i>
                  <span>nazimpahore8@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

