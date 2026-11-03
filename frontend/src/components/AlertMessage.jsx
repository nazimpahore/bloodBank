import React, { useEffect, useState } from 'react';
import { useBloodBank } from '../context/BloodBankContext';
import { useAuth } from '../context/AuthContext';

export default function AlertMessage() {
  const { notification, setNotification } = useBloodBank();
  const { authError, authSuccess, clearMessages } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(null);

  const msg =
    notification ||
    (authError
      ? { type: 'danger', message: authError }
      : authSuccess
      ? { type: 'success', message: authSuccess }
      : null);

  const cleanState = () => {
    clearMessages();
    if (setNotification) setNotification(null);
    setCurrentMessage(null);
  };

  useEffect(() => {
    if (msg?.message) {
      setCurrentMessage(msg);
      setIsVisible(true);

      // Auto dismiss after 500ms
      const fadeTimer = setTimeout(() => {
        setIsVisible(false);
      }, 500);

      const removeTimer = setTimeout(() => {
        cleanState();
      }, 750);

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
    }, 200);
  };

  if (!currentMessage && !isVisible) return null;

  const isSuccess = currentMessage?.type === 'success';

  return (
    <div
      className={`fixed top-5 right-5 sm:top-6 sm:right-6 z-[99999] pointer-events-auto transition-all duration-250 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
      }`}
    >
      <div
        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border shadow-lg text-sm font-medium ${
          isSuccess
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
            : 'bg-red-50 border-red-200 text-red-900'
        }`}
      >
        <i
          className={`fa-solid ${
            isSuccess ? 'fa-circle-check text-emerald-600' : 'fa-circle-exclamation text-red-600'
          } text-base flex-shrink-0`}
        ></i>

        <span className="leading-snug pr-1">{currentMessage?.message}</span>

        <button
          onClick={handleManualDismiss}
          className="text-gray-400 hover:text-gray-600 p-0.5 ml-1 transition cursor-pointer flex-shrink-0"
          title="Dismiss"
        >
          <i className="fa-solid fa-xmark text-xs"></i>
        </button>
      </div>
    </div>
  );
}
