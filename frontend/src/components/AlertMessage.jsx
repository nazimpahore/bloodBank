import React, { useEffect, useState } from 'react';
import { useBloodBank } from '../context/BloodBankContext';
import { useAuth } from '../context/AuthContext';

export default function AlertMessage() {
  const { notification, setNotification } = useBloodBank();
  const { authError, authSuccess, clearMessages } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  const msg = notification || (authError ? { type: 'danger', message: authError } : authSuccess ? { type: 'success', message: authSuccess } : null);

  const cleanState = () => {
    clearMessages();
    if (setNotification) setNotification(null);
  };

  useEffect(() => {
    if (msg) {
      setIsVisible(true);

      // Start smooth fade out after 1 second
      const fadeTimer = setTimeout(() => {
        setIsVisible(false);
      }, 1000);

      // Clean context state after smooth animation completes
      const removeTimer = setTimeout(() => {
        cleanState();
      }, 1500);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    } else {
      setIsVisible(false);
    }
  }, [msg?.message]);

  const handleManualDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      cleanState();
    }, 300);
  };

  if (!msg && !isVisible) return null;

  const isSuccess = msg?.type === 'success';

  return (
    <div
      className={`rounded-xl border shadow-sm transition-all duration-500 ease-out overflow-hidden ${
        isVisible
          ? 'opacity-100 translate-y-0 max-h-32 mb-6 p-4'
          : 'opacity-0 -translate-y-2 max-h-0 mb-0 py-0 px-4 border-transparent pointer-events-none'
      } ${
        isSuccess
          ? 'bg-[#ecfdf5] border-[#a7f3d0] text-[#065f46]'
          : 'bg-[#fef2f2] border-[#fecaca] text-[#991b1b]'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <i
            className={`fa-solid ${
              isSuccess ? 'fa-circle-check text-emerald-600' : 'fa-circle-exclamation text-red-600'
            } text-lg`}
          ></i>
          <span className="font-semibold text-sm">{msg?.message}</span>
        </div>
        <button
          onClick={handleManualDismiss}
          className="text-gray-400 hover:text-gray-600 transition text-sm cursor-pointer ml-4"
          title="Dismiss"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
}
