import React from 'react';
import { useBloodBank } from '../context/BloodBankContext';
import { useAuth } from '../context/AuthContext';

export default function AlertMessage() {
  const { notification } = useBloodBank();
  const { authError, authSuccess, clearMessages } = useAuth();

  const msg = notification || (authError ? { type: 'danger', message: authError } : authSuccess ? { type: 'success', message: authSuccess } : null);

  if (!msg) return null;

  const isSuccess = msg.type === 'success';

  return (
    <div className={`mb-6 p-4 rounded-xl flex items-center justify-between border shadow-sm ${
      isSuccess
        ? 'bg-[#ecfdf5] border-[#a7f3d0] text-[#065f46]'
        : 'bg-[#fef2f2] border-[#fecaca] text-[#991b1b]'
    }`}>
      <div className="flex items-center gap-3">
        <i className={`fa-solid ${isSuccess ? 'fa-circle-check text-emerald-600' : 'fa-circle-exclamation text-red-600'} text-lg`}></i>
        <span className="font-semibold text-sm">{msg.message}</span>
      </div>
      <button
        onClick={clearMessages}
        className="text-gray-400 hover:text-gray-600 transition text-sm cursor-pointer ml-4"
        title="Dismiss"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
}

