import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI, getAuthToken, setAuthToken } from '../api/apiClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('lifedrop_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  const clearMessages = useCallback(() => {
    setAuthError('');
    setAuthSuccess('');
  }, []);

  const logout = useCallback(() => {
    setAuthToken(null);
    setCurrentUser(null);
    localStorage.removeItem('lifedrop_current_user');
    clearMessages();
  }, [clearMessages]);

  // Synchronize currentUser with localStorage for session caching
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('lifedrop_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('lifedrop_current_user');
    }
  }, [currentUser]);

  // Verify active JWT token on app boot
  useEffect(() => {
    const verifySession = async () => {
      const token = getAuthToken();
      if (!token) {
        setLoading(false);
        return;
      }

      const { data, error } = await authAPI.getMe();
      if (data?.user) {
        setCurrentUser(data.user);
      } else {
        // Token expired or invalid
        logout();
      }
      setLoading(false);
    };

    verifySession();

    // Listen for global 401 unauthorized events from apiClient
    const handleUnauthorized = () => {
      logout();
    };
    window.addEventListener('lifedrop_auth_unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('lifedrop_auth_unauthorized', handleUnauthorized);
    };
  }, [logout]);

  const loginHospital = async (email, password) => {
    clearMessages();
    const { data, error } = await authAPI.loginHospital(email, password);
    if (data?.user && data?.token) {
      setAuthToken(data.token);
      setCurrentUser(data.user);
      setAuthSuccess(`Welcome back, ${data.user.hname}!`);
      return true;
    }
    setAuthError(error || 'Invalid email or password.');
    return false;
  };

  const loginReceiver = async (email, password) => {
    clearMessages();
    const { data, error } = await authAPI.loginReceiver(email, password);
    if (data?.user && data?.token) {
      setAuthToken(data.token);
      setCurrentUser(data.user);
      setAuthSuccess(`Welcome back, ${data.user.rname}!`);
      return true;
    }
    setAuthError(error || 'Invalid email or password.');
    return false;
  };

  const registerHospital = async (formData) => {
    clearMessages();
    const { data, error } = await authAPI.registerHospital(formData);
    if (data?.user && data?.token) {
      setAuthToken(data.token);
      setCurrentUser(data.user);
      setAuthSuccess('Hospital registered successfully!');
      return true;
    }
    setAuthError(error || 'Failed to register hospital.');
    return false;
  };

  const registerReceiver = async (formData) => {
    clearMessages();
    const { data, error } = await authAPI.registerReceiver(formData);
    if (data?.user && data?.token) {
      setAuthToken(data.token);
      setCurrentUser(data.user);
      setAuthSuccess('Account created successfully! Welcome to LifeDrop.');
      return true;
    }
    setAuthError(error || 'Failed to create user account.');
    return false;
  };

  const updateHospitalProfile = async (updatedData) => {
    clearMessages();
    const { data, error } = await authAPI.updateHospitalProfile(updatedData);
    if (data?.user) {
      setCurrentUser(data.user);
      setAuthSuccess('Hospital profile updated successfully!');
      return true;
    }
    setAuthError(error || 'Failed to update profile.');
    return false;
  };

  const updateReceiverProfile = async (updatedData) => {
    clearMessages();
    const { data, error } = await authAPI.updateReceiverProfile(updatedData);
    if (data?.user) {
      setCurrentUser(data.user);
      setAuthSuccess('Profile updated successfully!');
      return true;
    }
    setAuthError(error || 'Failed to update profile.');
    return false;
  };

  const requestPasswordReset = async (email, role) => {
    clearMessages();
    const cleanEmail = email.trim().toLowerCase();

    const { data, error } = await authAPI.requestPasswordReset({ email: cleanEmail, role });
    if (data) {
      setAuthSuccess(data.message || 'Verification code sent to your registered contact.');
      return {
        success: true,
        message: data.message,
        phoneHint: data.phoneHint,
      };
    }

    setAuthError(error || 'No account found with this email.');
    return { success: false, error: error || 'Failed to request reset code.' };
  };

  const verifyResetCode = async (email, role, otp) => {
    clearMessages();
    const cleanEmail = email.trim().toLowerCase();
    const cleanOtp = otp.toString().trim();

    const { data, error } = await authAPI.verifyResetCode({ email: cleanEmail, role, otp: cleanOtp });
    if (data?.verified) {
      setAuthSuccess('Code verified successfully.');
      return { success: true };
    }

    setAuthError(error || 'Invalid or expired verification code.');
    return { success: false, error: error || 'Invalid or expired verification code.' };
  };

  const resetPassword = async ({ email, role, otp, newPassword, confirmPassword }) => {
    clearMessages();
    const cleanEmail = email.trim().toLowerCase();
    const cleanOtp = otp.toString().trim();

    if (newPassword !== confirmPassword) {
      setAuthError('Passwords do not match.');
      return { success: false, error: 'Passwords do not match.' };
    }
    if (newPassword.length < 6) {
      setAuthError('Password must be at least 6 characters long.');
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    const { data, error } = await authAPI.resetPassword({
      email: cleanEmail,
      role,
      otp: cleanOtp,
      newPassword,
      confirmPassword,
    });

    if (data) {
      setAuthSuccess('Password has been reset successfully! You can now log in.');
      return { success: true };
    }

    setAuthError(error || 'Failed to reset password.');
    return { success: false, error: error || 'Failed to reset password.' };
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        hospitals: [],
        receivers: [],
        authError,
        authSuccess,
        loginHospital,
        loginReceiver,
        registerHospital,
        registerReceiver,
        logout,
        updateHospitalProfile,
        updateReceiverProfile,
        requestPasswordReset,
        verifyResetCode,
        resetPassword,
        clearMessages,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
