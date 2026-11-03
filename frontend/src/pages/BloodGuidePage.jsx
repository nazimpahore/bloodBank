import React from 'react';
import AlertMessage from '../components/AlertMessage';

/* ── Inline SVG blood-drop icon ── */
function BloodDrop({ label, className = '' }) {
  return (
    <div className={`blood-drop-icon ${className}`}>
      <svg viewBox="0 0 60 75" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M30 4 C30 4 4 34 4 50 C4 63.8 15.6 74 30 74 C44.4 74 56 63.8 56 50 C56 34 30 4 30 4Z"
          fill="url(#dropGrad)"
        />
        <defs>
          <linearGradient id="dropGrad" x1="30" y1="4" x2="30" y2="74" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>
        </defs>
        <text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle"
          fill="white" fontSize="20" fontWeight="800" fontFamily="'Plus Jakarta Sans', sans-serif">
          {label}
        </text>
      </svg>
    </div>
  );
}

/* ── ECG / heartbeat SVG decoration ── */
function EcgLine() {
  return (
    <svg className="ecg-line" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline
        points="0,20 20,20 28,5 34,35 40,5 46,20 60,20 68,18 72,20 120,20"
        stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
      <circle cx="112" cy="20" r="6" fill="#dc2626" opacity="0.15" />
      <circle cx="112" cy="20" r="4" fill="#dc2626" />
    </svg>
  );
}

/* ── Red wave / ribbon decoration at card bottom ── */
function CardWave() {
  return (
    <svg className="card-wave" viewBox="0 0 320 28" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 16 Q40 0 80 14 Q120 28 160 14 Q200 0 240 14 Q280 28 320 16 L320 28 L0 28 Z" fill="#dc2626" />
    </svg>
  );
}

/* ── Green donor section icon ── */
function GiveIcon() {
  return (
    <div className="compat-section-icon give-icon">
      <i className="fa-solid fa-people-group" />
    </div>
  );
}

/* ── Blue receive section icon ── */
function ReceiveIcon() {
  return (
    <div className="compat-section-icon receive-icon">
      <i className="fa-solid fa-circle-arrow-down" />
    </div>
  );
}

export default function BloodGuidePage() {
  const bloodCards = [
    {
      group: 'A+',
      name: 'Type A Positive',
      desc: 'A+ is a common blood type.',
      give: ['A+', 'AB+'],
      receive: ['A+', 'A-', 'O+', 'O-'],
    },
    {
      group: 'A-',
      name: 'Type A Negative',
      desc: 'A- can donate to all A and AB types.',
      give: ['A-', 'A+', 'AB-', 'AB+'],
      receive: ['A-', 'O-'],
    },
    {
      group: 'B+',
      name: 'Type B Positive',
      desc: 'B+ is found in about 9% of people.',
      give: ['B+', 'AB+'],
      receive: ['B+', 'B-', 'O+', 'O-'],
    },
    {
      group: 'B-',
      name: 'Type B Negative',
      desc: 'B- is a rare and valuable blood type.',
      give: ['B-', 'B+', 'AB-', 'AB+'],
      receive: ['B-', 'O-'],
    },
    {
      group: 'AB+',
      name: 'Type AB Positive',
      desc: 'AB+ is the universal recipient type.',
      give: ['AB+ only'],
      receive: ['All Blood Groups'],
    },
    {
      group: 'AB-',
      name: 'Type AB Negative',
      desc: 'AB- is one of the rarest blood types.',
      give: ['AB-', 'AB+'],
      receive: ['AB-', 'A-', 'B-', 'O-'],
    },
    {
      group: 'O+',
      name: 'Type O Positive',
      desc: 'O+ is the most common blood type.',
      give: ['O+', 'A+', 'B+', 'AB+'],
      receive: ['O+', 'O-'],
    },
    {
      group: 'O-',
      name: 'Type O Negative',
      desc: 'O- is the universal red cell donor.',
      give: ['All Blood Groups'],
      receive: ['O- only'],
    },
  ];

  return (
    <div>
      {/* Section Header */}
      <div className="bg-white border-b border-gray-200 py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="bg-gray-100 border border-gray-200 text-red-600 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 mb-3">
            <i className="fa-solid fa-droplet text-red-600"></i> COMPATIBILITY CHART
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            Blood Group Compatibility &amp; Health
          </h1>
          <p className="text-gray-500 text-base max-w-2xl mx-auto leading-relaxed">
            Understanding who you can give blood to and receive blood from saves lives in critical moments. Review your group below.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <AlertMessage />

        {/* Quick Summary Alert */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
              <div className="py-2 px-4">
                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full inline-block mb-2">
                  O Negative (O-)
                </span>
                <div className="text-base font-bold text-gray-900">Universal Red Cell Donor</div>
                <small className="text-gray-500 text-xs">Can donate to every blood group</small>
              </div>
              <div className="py-2 px-4">
                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full inline-block mb-2">
                  AB Positive (AB+)
                </span>
                <div className="text-base font-bold text-gray-900">Universal Recipient</div>
                <small className="text-gray-500 text-xs">Can receive red cells from every group</small>
              </div>
            </div>
          </div>
        </div>

        {/* Blood Type Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {bloodCards.map(card => (
            <div key={card.group} className="bg-card">

              {/* ── Card Header ── */}
              <div className="bg-card-header">
                {/* Pink circle blob — top right decoration */}
                <div className="bg-card-blob" />

                {/* Blood drop + title */}
                <div className="bg-card-title-row">
                  <BloodDrop label={card.group} />
                  <div className="bg-card-title-divider" />
                  <div className="bg-card-title-text">
                    <h5 className="bg-card-name">
                      {card.name.split(' ').slice(0, 1).join(' ')}{' '}
                      <span className="bg-card-name-accent">
                        {card.name.split(' ').slice(1).join(' ')}
                      </span>
                    </h5>
                    <p className="bg-card-desc">{card.desc}</p>
                  </div>
                </div>

                {/* ECG decoration */}
                <EcgLine />
              </div>

              {/* ── Card Body ── */}
              <div className="bg-card-body">

                {/* Can Give To */}
                <div className="bg-compat-section bg-give-section">
                  <div className="bg-compat-header">
                    <GiveIcon />
                    <div>
                      <p className="bg-compat-label">Can Give To:</p>
                      <p className="bg-compat-sub">You can donate to these blood types</p>
                    </div>
                  </div>
                  <div className="bg-tags-row">
                    {card.give.map((g, i) => (
                      <span key={i} className="bg-tag bg-tag-give">{g}</span>
                    ))}
                  </div>
                </div>

                {/* Can Receive From */}
                <div className="bg-compat-section bg-receive-section">
                  <div className="bg-compat-header">
                    <ReceiveIcon />
                    <div>
                      <p className="bg-compat-label">Can Receive From:</p>
                      <p className="bg-compat-sub">You can receive from these blood types</p>
                    </div>
                  </div>
                  <div className="bg-tags-row">
                    {card.receive.map((r, i) => (
                      <span key={i} className="bg-tag bg-tag-receive">{r}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Card Wave Footer ── */}
              <CardWave />
            </div>
          ))}
        </div>

        {/* Health & Preparation Tips Section */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-10 mb-12">
          <div className="flex items-center gap-4 mb-8">
            <span className="brand-icon-wrapper bg-red-100 text-red-600 w-12 h-12 text-xl">
              <i className="fa-solid fa-heart-pulse"></i>
            </span>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-0.5">Donor Health &amp; Wellness Tips</h3>
              <p className="text-gray-500 text-xs sm:text-sm">Guidelines recommended by medical experts and the World Health Organization (WHO)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="stat-icon bg-emerald-100 text-emerald-600">
                <i className="fa-solid fa-apple-whole"></i>
              </div>
              <div>
                <h6 className="font-bold text-gray-900 text-base mb-1">Eat a Balanced &amp; Healthy Diet</h6>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Consume a variety of nutrient-dense foods including fruits, whole grains, nuts, and iron-rich vegetables. Maintain healthy hemoglobin levels before donation.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="stat-icon bg-sky-100 text-sky-600">
                <i className="fa-solid fa-glass-water"></i>
              </div>
              <div>
                <h6 className="font-bold text-gray-900 text-base mb-1">Hydrate Adequately</h6>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Drink plenty of clean water (at least 500ml) right before and after donating blood to maintain body fluid volume and prevent dizziness.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="stat-icon bg-amber-100 text-amber-600">
                <i className="fa-solid fa-person-running"></i>
              </div>
              <div>
                <h6 className="font-bold text-gray-900 text-base mb-1">Regular Physical Activity</h6>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Engage in at least 150 minutes of moderate-intensity activity per week to support optimal cardiovascular health, muscle stamina, and circulation.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="stat-icon bg-red-100 text-red-600">
                <i className="fa-solid fa-ban-smoking"></i>
              </div>
              <div>
                <h6 className="font-bold text-gray-900 text-base mb-1">Avoid Smoking &amp; Alcohol</h6>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Do not smoke or consume alcoholic beverages for at least 24 to 48 hours prior to donating blood to ensure optimal oxygen delivery in donated cells.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs sm:text-sm text-gray-500">
              <i className="fa-solid fa-circle-info text-blue-600 mr-1.5"></i> For detailed clinical guidelines and donation criteria, read official publications.
            </span>
            <a
              href="https://www.who.int/news-room/fact-sheets/detail/blood-safety-and-availability"
              target="_blank"
              rel="noreferrer"
              className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5"
            >
              WHO Guidelines <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

