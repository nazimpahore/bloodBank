import React from 'react';
import AlertMessage from '../components/AlertMessage';

export default function BloodGuidePage() {
  const bloodCards = [
    {
      group: 'A+',
      name: 'Type A Positive',
      give: ['A+', 'AB+'],
      receive: ['A+', 'A-', 'O+', 'O-'],
      badgeBg: 'bg-gradient-to-br from-red-500 to-red-600',
    },
    {
      group: 'A-',
      name: 'Type A Negative',
      give: ['A-', 'A+', 'AB-', 'AB+'],
      receive: ['A-', 'O-'],
      badgeBg: 'bg-gradient-to-br from-rose-500 to-rose-600',
    },
    {
      group: 'B+',
      name: 'Type B Positive',
      give: ['B+', 'AB+'],
      receive: ['B+', 'B-', 'O+', 'O-'],
      badgeBg: 'bg-gradient-to-br from-red-500 to-red-600',
    },
    {
      group: 'B-',
      name: 'Type B Negative',
      give: ['B-', 'B+', 'AB-', 'AB+'],
      receive: ['B-', 'O-'],
      badgeBg: 'bg-gradient-to-br from-rose-500 to-rose-600',
    },
    {
      group: 'AB+',
      name: 'Type AB Positive',
      give: ['AB+ only'],
      receive: ['All Blood Groups (Universal)'],
      badgeBg: 'bg-gradient-to-br from-sky-500 to-sky-700',
    },
    {
      group: 'AB-',
      name: 'Type AB Negative',
      give: ['AB-', 'AB+'],
      receive: ['AB-', 'A-', 'B-', 'O-'],
      badgeBg: 'bg-gradient-to-br from-sky-500 to-sky-700',
    },
    {
      group: 'O+',
      name: 'Type O Positive',
      give: ['O+', 'A+', 'B+', 'AB+'],
      receive: ['O+', 'O-'],
      badgeBg: 'bg-gradient-to-br from-red-500 to-red-600',
    },
    {
      group: 'O-',
      name: 'Type O Negative',
      give: ['All Blood Groups (Universal)'],
      receive: ['O- only'],
      badgeBg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
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
            <div key={card.group} className="blood-group-card p-6">
              <div className={`blood-badge ${card.badgeBg}`}>
                {card.group}
              </div>
              <h5 className="text-center font-bold text-lg text-gray-900 mb-4">{card.name}</h5>

              <div className="mb-4">
                <small className="text-gray-500 font-bold block text-xs uppercase mb-1.5">
                  <i className="fa-solid fa-hand-holding-heart text-emerald-600 mr-1"></i> CAN GIVE TO:
                </small>
                <div className="flex flex-wrap gap-1">
                  {card.give.map((g, i) => (
                    <span key={i} className="compat-tag compat-give">
                      {g}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <small className="text-gray-500 font-bold block text-xs uppercase mb-1.5">
                  <i className="fa-solid fa-syringe text-blue-600 mr-1"></i> CAN RECEIVE FROM:
                </small>
                <div className="flex flex-wrap gap-1">
                  {card.receive.map((r, i) => (
                    <span key={i} className="compat-tag compat-receive">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
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

