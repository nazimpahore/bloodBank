const rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_BASE_URL = rawApiUrl.replace(/\/+$/, '').endsWith('/api')
  ? rawApiUrl.replace(/\/+$/, '')
  : `${rawApiUrl.replace(/\/+$/, '')}/api`;

export const getAuthToken = () => localStorage.getItem('lifedrop_token');
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('lifedrop_token', token);
  } else {
    localStorage.removeItem('lifedrop_token');
  }
};

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();

  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (response.status === 401) {
      // Clear token if invalid or expired
      setAuthToken(null);
      localStorage.removeItem('lifedrop_current_user');
      window.dispatchEvent(new Event('lifedrop_auth_unauthorized'));
    }

    if (!response.ok) {
      throw new Error(data.error || 'Server error occurred');
    }
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}

export const authAPI = {
  loginHospital: (hemail, hpassword) =>
    request('/auth/hospital/login', {
      method: 'POST',
      body: JSON.stringify({ hemail, hpassword }),
    }),

  registerHospital: (data) =>
    request('/auth/hospital/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  loginReceiver: (remail, rpassword) =>
    request('/auth/receiver/login', {
      method: 'POST',
      body: JSON.stringify({ remail, rpassword }),
    }),

  registerReceiver: (data) =>
    request('/auth/receiver/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getMe: () => request('/auth/me'),

  updateHospitalProfile: (data) =>
    request('/auth/hospital/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  updateReceiverProfile: (data) =>
    request('/auth/receiver/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  requestPasswordReset: ({ email, role }) =>
    request('/auth/forgot-password/request', {
      method: 'POST',
      body: JSON.stringify({ email, role }),
    }),

  verifyResetCode: ({ email, role, otp }) =>
    request('/auth/forgot-password/verify', {
      method: 'POST',
      body: JSON.stringify({ email, role, otp }),
    }),

  resetPassword: ({ email, role, otp, newPassword, confirmPassword }) =>
    request('/auth/forgot-password/reset', {
      method: 'POST',
      body: JSON.stringify({ email, role, otp, newPassword, confirmPassword }),
    }),
};

export const hospitalAPI = {
  getStock: (hid) => request(`/hospital/stock/${hid}`),
  addStock: (hid, bg) =>
    request('/hospital/stock', {
      method: 'POST',
      body: JSON.stringify({ hid, bg }),
    }),
  deleteStock: (bid) =>
    request(`/hospital/stock/${bid}`, {
      method: 'DELETE',
    }),

  getRequests: (hid) => request(`/hospital/requests/${hid}`),
  acceptRequest: (reqid) =>
    request(`/hospital/requests/${reqid}/accept`, {
      method: 'PUT',
    }),
  rejectRequest: (reqid) =>
    request(`/hospital/requests/${reqid}/reject`, {
      method: 'PUT',
    }),

  getDonorRequests: (hid) => request(`/hospital/donor-requests/${hid}`),
  requestDonor: (hid, rid, bg) =>
    request('/hospital/donor-requests', {
      method: 'POST',
      body: JSON.stringify({ hid, rid, bg }),
    }),
  cancelDonorRequest: (donoid) =>
    request(`/hospital/donor-requests/${donoid}`, {
      method: 'DELETE',
    }),
};

export const receiverAPI = {
  getDonations: (rid) => request(`/receiver/donations/${rid}`),
  addDonation: (rid, bg) =>
    request('/receiver/donations', {
      method: 'POST',
      body: JSON.stringify({ rid, bg }),
    }),
  deleteDonation: (bdid) =>
    request(`/receiver/donations/${bdid}`, {
      method: 'DELETE',
    }),

  getRequests: (rid) => request(`/receiver/requests/${rid}`),
  requestBlood: (hid, rid, bg) =>
    request('/receiver/requests', {
      method: 'POST',
      body: JSON.stringify({ hid, rid, bg }),
    }),
  cancelRequest: (reqid) =>
    request(`/receiver/requests/${reqid}`, {
      method: 'DELETE',
    }),

  getInquiries: (rid) => request(`/receiver/inquiries/${rid}`),
  acceptInquiry: (donoid) =>
    request(`/receiver/inquiries/${donoid}/accept`, {
      method: 'PUT',
    }),
  rejectInquiry: (donoid) =>
    request(`/receiver/inquiries/${donoid}/reject`, {
      method: 'PUT',
    }),
};

export const publicAPI = {
  getBloodStock: (bg) => request(`/public/blood-stock${bg ? `?bg=${encodeURIComponent(bg)}` : ''}`),
  getCommunityDonors: (bg) => request(`/public/community-donors${bg ? `?bg=${encodeURIComponent(bg)}` : ''}`),
  getStats: () => request('/public/stats'),
};
