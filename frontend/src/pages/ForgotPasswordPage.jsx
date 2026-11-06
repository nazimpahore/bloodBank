import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AlertMessage from '../components/AlertMessage';

export default function ForgotPasswordPage() {
  const {
    currentUser,
    requestPasswordReset,
    verifyResetCode,
    resetPassword,
    clearMessages,
  } = useAuth();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Role tab: 'hospital' or 'receiver'
  const initialRole = searchParams.get('role') === 'hospital' ? 'hospital' : 'receiver';
  const [activeTab, setActiveTab] = useState(initialRole);

  // Multi-step progress (1: Email/Request, 2: Code, 3: New Password, 4: Done)
  const [step, setStep] = useState(1);

  // Form states
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [phoneHint, setPhoneHint] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState('');

  useEffect(() => {
    if (currentUser?.role === 'hospital') {
      navigate('/hospital/dashboard');
    } else if (currentUser?.role === 'receiver') {
      navigate('/user/dashboard');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    clearMessages();
    setLocalError('');
  }, [activeTab, clearMessages]);

  const handleTabChange = (role) => {
    setActiveTab(role);
    setStep(1);
    setOtp('');
    setLocalError('');
  };

  // Step 1: Request OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setLocalError('');
    if (!email) {
      setLocalError('Please enter your registered email address.');
      return;
    }

    setIsSubmitting(true);
    const result = await requestPasswordReset(email, activeTab);
    setIsSubmitting(false);

    if (result.success) {
      setPhoneHint(result.phoneHint || '');
      setStep(2);
    } else {
      setLocalError(result.error || 'Failed to request password reset code.');
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLocalError('');
    if (!otp || otp.length < 6) {
      setLocalError('Please enter the 6-digit verification code.');
      return;
    }

    setIsSubmitting(true);
    const result = await verifyResetCode(email, activeTab, otp);
    setIsSubmitting(false);

    if (result.success) {
      setStep(3);
    } else {
      setLocalError(result.error || 'Invalid or expired verification code.');
    }
  };

  // Step 3: Set New Password via OTP
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (newPassword.length < 6) {
      setLocalError('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setLocalError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    const result = await resetPassword({
      email,
      role: activeTab,
      otp,
      newPassword,
      confirmPassword,
    });
    setIsSubmitting(false);

    if (result.success) {
      setStep(4);
    } else {
      setLocalError(result.error || 'Failed to reset password. Please try again.');
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <AlertMessage />

        {localError && (
          <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-circle-exclamation text-red-600"></i>
              <span>{localError}</span>
            </div>
            <button
              onClick={() => setLocalError('')}
              className="text-gray-400 hover:text-gray-600 cursor-pointer ml-2"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        )}

        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="text-center pt-8 pb-4 px-6">
            <div className="brand-icon-wrapper w-14 h-14 text-2xl mx-auto mb-3 bg-red-100 text-red-600">
              <i className="fa-solid fa-key"></i>
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-1">Reset Password</h4>
            <p className="text-gray-500 text-xs sm:text-sm">
              {step === 4
                ? 'Your password has been reset successfully'
                : 'Recover access to your LifeDrop account securely'}
            </p>
          </div>

          {/* Account Role Tabs (Only show if not finished) */}
          {step < 4 && (
            <div className="flex border-b border-gray-200 bg-gray-50/70 p-1.5 gap-1.5">
              <button
                type="button"
                onClick={() => handleTabChange('hospital')}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition cursor-pointer flex items-center justify-center gap-2 ${
                  activeTab === 'hospital'
                    ? 'bg-white text-red-600 shadow-sm border-b-2 border-red-600'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <i className="fa-solid fa-hospital"></i> Hospital / Clinic
              </button>
              <button
                type="button"
                onClick={() => handleTabChange('receiver')}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition cursor-pointer flex items-center justify-center gap-2 ${
                  activeTab === 'receiver'
                    ? 'bg-white text-red-600 shadow-sm border-b-2 border-red-600'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <i className="fa-solid fa-user"></i> Individual / Donor
              </button>
            </div>
          )}

          {/* Step Progress Indicators */}
          {step < 4 && (
            <div className="px-8 pt-4">
              <div className="flex items-center justify-between text-xs font-semibold text-gray-500 mb-2">
                <span className={step >= 1 ? 'text-red-600' : ''}>1. Email</span>
                <span className={step >= 2 ? 'text-red-600' : ''}>2. Verify Code</span>
                <span className={step >= 3 ? 'text-red-600' : ''}>3. New Password</span>
              </div>
              <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-red-600 h-full transition-all duration-300"
                  style={{
                    width: step === 1 ? '33.3%' : step === 2 ? '66.6%' : '100%',
                  }}
                ></div>
              </div>
            </div>
          )}

          {/* Body Content */}
          <div className="p-6 sm:p-8">
            {/* STEP 1: Enter Email */}
            {step === 1 && (
              <form onSubmit={handleRequestOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">
                    <i className="fa-solid fa-envelope text-red-600 mr-1"></i>
                    {activeTab === 'hospital' ? 'Hospital Registered Email' : 'User / Donor Registered Email'}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={
                      activeTab === 'hospital' ? 'info@lnh.edu.pk' : 'user@domain.com'
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition text-sm"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    A secure one-time verification code will be generated for your {activeTab === 'hospital' ? 'hospital' : 'user'} account.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin"></i> Checking Account...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-paper-plane"></i> Send Verification Code
                    </>
                  )}
                </button>
              </form>
            )}

            {/* STEP 2: Verify 6-digit Code */}
            {step === 2 && (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900">
                  <div className="flex items-center gap-2 font-bold mb-1">
                    <i className="fa-solid fa-shield-halved text-blue-600"></i>
                    <span>Code Dispatched Securely</span>
                  </div>
                  <p className="text-blue-800 text-xs">
                    A 6-digit verification code has been issued for <strong>{email}</strong>
                    {phoneHint ? ` (${phoneHint})` : ''}.
                  </p>
                  <p className="text-[11px] text-blue-600 mt-1 italic">
                    (In local development mode, check your backend server terminal to view the code)
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-gray-600 uppercase">
                      <i className="fa-solid fa-hashtag text-red-600 mr-1"></i> 6-Digit Code
                    </label>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs text-gray-400 hover:text-red-600 cursor-pointer"
                    >
                      Change Email
                    </button>
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="123456"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition text-center text-lg font-mono tracking-widest font-bold"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500 text-center">
                    Enter the 6-digit numeric verification code
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || otp.length < 6}
                  className="w-full mt-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin"></i> Verifying Code...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-check-double"></i> Verify Code
                    </>
                  )}
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={handleRequestOtp}
                    className="text-xs text-red-600 hover:underline cursor-pointer font-semibold"
                  >
                    Didn't receive code? Resend
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: Enter New Password */}
            {step === 3 && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">
                    <i className="fa-solid fa-lock text-red-600 mr-1"></i> New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      minLength={6}
                      className="w-full px-4 py-2.5 pr-10 rounded-xl border border-gray-200 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition text-sm"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                  <span className="text-[11px] text-gray-400">Minimum 6 characters</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">
                    <i className="fa-solid fa-shield text-red-600 mr-1"></i> Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      minLength={6}
                      className="w-full px-4 py-2.5 pr-10 rounded-xl border border-gray-200 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition text-sm"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                      title={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      <i className={`fa-solid ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                  {confirmPassword && newPassword !== confirmPassword && (
                    <span className="text-[11px] text-red-500 font-semibold block mt-1">Passwords do not match</span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || newPassword.length < 6 || newPassword !== confirmPassword}
                  className="w-full mt-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin"></i> Updating Password...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-floppy-disk"></i> Save New Password
                    </>
                  )}
                </button>
              </form>
            )}

            {/* STEP 4: Success Message */}
            {step === 4 && (
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-sm">
                  <i className="fa-solid fa-circle-check"></i>
                </div>
                <div>
                  <h5 className="text-lg font-bold text-gray-900">
                    Password Reset Complete!
                  </h5>
                  <p className="text-gray-500 text-sm mt-1">
                    Your password has been successfully updated and securely hashed. You can now log into your{' '}
                    <span className="font-semibold text-gray-700">
                      {activeTab === 'hospital' ? 'Hospital' : 'User'}
                    </span>{' '}
                    account using your new credentials.
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition"
                  >
                    <i className="fa-solid fa-right-to-bracket"></i> Proceed to Login
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Card Footer */}
          <div className="bg-gray-50 border-t border-gray-200 text-center py-4 px-6 text-xs text-gray-500 flex items-center justify-between">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 font-semibold text-gray-600 hover:text-red-600 hover:underline"
            >
              <i className="fa-solid fa-arrow-left"></i> Back to Login
            </Link>
            <Link
              to="/register"
              className="font-bold text-red-600 hover:underline"
            >
              Create New Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
