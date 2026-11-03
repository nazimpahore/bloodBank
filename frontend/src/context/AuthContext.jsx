import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api/apiClient';

const AuthContext = createContext();

const INITIAL_HOSPITALS = [
  { id: 1, hname: 'Liaquat National Hospital', hemail: 'info@lnh.edu.pk', hpassword: 'gandhi', hphone: '03018234512', hcity: 'Karachi' },
  { id: 4, hname: 'Civil Hospital (Dr. Ruth Pfau)', hemail: 'contact@chk.gov.pk', hpassword: 'arunodhaya', hphone: '03129845123', hcity: 'Karachi' },
  { id: 5, hname: 'LUMHS Civil Hospital', hemail: 'helpdesk@lumhs.edu.pk', hpassword: 'asia47', hphone: '03023456789', hcity: 'Hyderabad' },
  { id: 6, hname: 'Indus Hospital & Health Network', hemail: 'badin.campus@tih.org.pk', hpassword: 'apollo247', hphone: '03332456781', hcity: 'Badin' },
  { id: 7, hname: 'GMMMC Teaching Hospital', hemail: 'info@gmmmc.edu.pk', hpassword: 'amaravathi', hphone: '03458765432', hcity: 'Sukkur' },
];

const INITIAL_RECEIVERS = [
  { id: 1, rname: 'Muhammad Ali Khan', remail: 'm.ali.khan@gmail.com', rpassword: 'test', rphone: '03001234567', rbg: 'A+', rcity: 'Karachi' },
  { id: 4, rname: 'Tariq Mehmood Soomro', remail: 'tariq.soomro@gmail.com', rpassword: 'xyz@47', rphone: '03029871234', rbg: 'B+', rcity: 'Hyderabad' },
  { id: 5, rname: 'Zubair Ahmed Memon', remail: 'zubair.memon78@gmail.com', rpassword: 'rithish', rphone: '03134567890', rbg: 'B+', rcity: 'Sukkur' },
  { id: 6, rname: 'Bilal Hussain Shah', remail: 'bilal.shah92@gmail.com', rpassword: 'akshay74', rphone: '03461239874', rbg: 'B+', rcity: 'Larkana' },
  { id: 7, rname: 'Ayesha Siddiqa', remail: 'ayesha.siddiqa44@gmail.com', rpassword: 'nandhu989', rphone: '03348765412', rbg: 'AB-', rcity: 'Mirpurkhas' },
];

export function AuthProvider({ children }) {
  const [hospitals, setHospitals] = useState(() => {
    const saved = localStorage.getItem('lifedrop_hospitals');
    return saved ? JSON.parse(saved) : INITIAL_HOSPITALS;
  });

  const [receivers, setReceivers] = useState(() => {
    const saved = localStorage.getItem('lifedrop_receivers');
    return saved ? JSON.parse(saved) : INITIAL_RECEIVERS;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('lifedrop_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  useEffect(() => {
    localStorage.setItem('lifedrop_hospitals', JSON.stringify(hospitals));
  }, [hospitals]);

  useEffect(() => {
    localStorage.setItem('lifedrop_receivers', JSON.stringify(receivers));
  }, [receivers]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('lifedrop_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('lifedrop_current_user');
    }
  }, [currentUser]);

  const clearMessages = () => {
    setAuthError('');
    setAuthSuccess('');
  };

  const loginHospital = async (email, password) => {
    clearMessages();
    // Try backend API first
    const { data, error } = await authAPI.loginHospital(email, password);
    if (data?.user) {
      setCurrentUser(data.user);
      setAuthSuccess(`Welcome back, ${data.user.hname}!`);
      return true;
    }

    // Fallback to local storage
    const hospital = hospitals.find(h => h.hemail.toLowerCase() === email.toLowerCase());
    if (!hospital) {
      setAuthError(error || 'Email not found. Please register or check spelling.');
      return false;
    }
    if (hospital.hpassword !== password) {
      setAuthError('Invalid password credentials.');
      return false;
    }
    const userSession = { ...hospital, role: 'hospital' };
    setCurrentUser(userSession);
    setAuthSuccess(`Welcome back, ${hospital.hname}!`);
    return true;
  };

  const loginReceiver = async (email, password) => {
    clearMessages();
    // Try backend API first
    const { data, error } = await authAPI.loginReceiver(email, password);
    if (data?.user) {
      setCurrentUser(data.user);
      setAuthSuccess(`Welcome back, ${data.user.rname}!`);
      return true;
    }

    // Fallback to local storage
    const receiver = receivers.find(r => r.remail.toLowerCase() === email.toLowerCase());
    if (!receiver) {
      setAuthError(error || 'Email not registered. Please create an account.');
      return false;
    }
    if (receiver.rpassword !== password) {
      setAuthError('Invalid password credentials.');
      return false;
    }
    const userSession = { ...receiver, role: 'receiver' };
    setCurrentUser(userSession);
    setAuthSuccess(`Welcome back, ${receiver.rname}!`);
    return true;
  };

  const registerHospital = async ({ hname, hemail, hpassword, hphone, hcity }) => {
    clearMessages();
    const { data } = await authAPI.registerHospital({ hname, hemail, hpassword, hphone, hcity });
    if (data?.user) {
      setHospitals(prev => [...prev, data.user]);
      setCurrentUser(data.user);
      setAuthSuccess('Hospital registered successfully!');
      return true;
    }

    const exists = hospitals.some(h => h.hemail.toLowerCase() === hemail.toLowerCase());
    if (exists) {
      setAuthError('A hospital with this email is already registered.');
      return false;
    }
    const newHospital = { id: Date.now(), hname, hemail, hpassword, hphone, hcity };
    setHospitals(prev => [...prev, newHospital]);
    const userSession = { ...newHospital, role: 'hospital' };
    setCurrentUser(userSession);
    setAuthSuccess('Hospital registered successfully!');
    return true;
  };

  const registerReceiver = async ({ rname, remail, rpassword, rphone, rbg, rcity }) => {
    clearMessages();
    const { data } = await authAPI.registerReceiver({ rname, remail, rpassword, rphone, rbg, rcity });
    if (data?.user) {
      setReceivers(prev => [...prev, data.user]);
      setCurrentUser(data.user);
      setAuthSuccess('Account created successfully! Welcome to LifeDrop.');
      return true;
    }

    const exists = receivers.some(r => r.remail.toLowerCase() === remail.toLowerCase());
    if (exists) {
      setAuthError('A user with this email is already registered.');
      return false;
    }
    const newReceiver = { id: Date.now(), rname, remail, rpassword, rphone, rbg, rcity };
    setReceivers(prev => [...prev, newReceiver]);
    const userSession = { ...newReceiver, role: 'receiver' };
    setCurrentUser(userSession);
    setAuthSuccess('Account created successfully! Welcome to LifeDrop.');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    clearMessages();
  };

  const updateHospitalProfile = async (updatedData) => {
    if (currentUser?.id || currentUser?._id) {
      await authAPI.updateHospitalProfile({ id: currentUser._id || currentUser.id, ...updatedData });
    }
    setHospitals(prev => prev.map(h => (h.id === currentUser.id || h._id === currentUser._id) ? { ...h, ...updatedData } : h));
    setCurrentUser(prev => ({ ...prev, ...updatedData }));
    setAuthSuccess('Hospital profile updated successfully!');
  };

  const updateReceiverProfile = async (updatedData) => {
    if (currentUser?.id || currentUser?._id) {
      await authAPI.updateReceiverProfile({ id: currentUser._id || currentUser.id, ...updatedData });
    }
    setReceivers(prev => prev.map(r => (r.id === currentUser.id || r._id === currentUser._id) ? { ...r, ...updatedData } : r));
    setCurrentUser(prev => ({ ...prev, ...updatedData }));
    setAuthSuccess('Profile updated successfully!');
  };

  const [resetSessions, setResetSessions] = useState(() => {
    const saved = localStorage.getItem('lifedrop_reset_sessions');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('lifedrop_reset_sessions', JSON.stringify(resetSessions));
  }, [resetSessions]);

  const requestPasswordReset = async (email, role) => {
    clearMessages();
    const cleanEmail = email.trim().toLowerCase();

    // Attempt backend API call
    const { data, error } = await authAPI.requestPasswordReset({ email: cleanEmail, role });
    if (data?.otp) {
      setResetSessions(prev => ({
        ...prev,
        [`${role}_${cleanEmail}`]: { otp: data.otp, expiresAt: Date.now() + 15 * 60 * 1000 },
      }));
      setAuthSuccess(data.message || 'Verification code generated.');
      return { success: true, otp: data.otp, message: data.message, phoneHint: data.phoneHint };
    }

    // Fallback: check local storage
    if (role === 'hospital') {
      const hospital = hospitals.find(h => h.hemail.toLowerCase() === cleanEmail);
      if (!hospital) {
        setAuthError(error || 'No hospital found registered with this email address.');
        return { success: false, error: error || 'No hospital found registered with this email address.' };
      }
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setResetSessions(prev => ({
        ...prev,
        [`${role}_${cleanEmail}`]: { otp, expiresAt: Date.now() + 15 * 60 * 1000 },
      }));
      setAuthSuccess(`Verification code generated for ${hospital.hname}.`);
      return {
        success: true,
        otp,
        message: `Verification code generated for ${hospital.hname}.`,
        phoneHint: hospital.hphone ? `***-***-${hospital.hphone.slice(-4)}` : null,
      };
    } else {
      const receiver = receivers.find(r => r.remail.toLowerCase() === cleanEmail);
      if (!receiver) {
        setAuthError(error || 'No user account found registered with this email address.');
        return { success: false, error: error || 'No user account found registered with this email address.' };
      }
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setResetSessions(prev => ({
        ...prev,
        [`${role}_${cleanEmail}`]: { otp, expiresAt: Date.now() + 15 * 60 * 1000 },
      }));
      setAuthSuccess(`Verification code generated for ${receiver.rname}.`);
      return {
        success: true,
        otp,
        message: `Verification code generated for ${receiver.rname}.`,
        phoneHint: receiver.rphone ? `***-***-${receiver.rphone.slice(-4)}` : null,
      };
    }
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

    // Fallback local check
    const session = resetSessions[`${role}_${cleanEmail}`];
    if (session && session.otp === cleanOtp && session.expiresAt > Date.now()) {
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
    if (newPassword.length < 4) {
      setAuthError('Password must be at least 4 characters long.');
      return { success: false, error: 'Password must be at least 4 characters long.' };
    }

    const { data, error } = await authAPI.resetPassword({
      email: cleanEmail,
      role,
      otp: cleanOtp,
      newPassword,
      confirmPassword,
    });

    // Update local state for immediate fallback login
    if (role === 'hospital') {
      setHospitals(prev =>
        prev.map(h => (h.hemail.toLowerCase() === cleanEmail ? { ...h, hpassword: newPassword } : h))
      );
    } else {
      setReceivers(prev =>
        prev.map(r => (r.remail.toLowerCase() === cleanEmail ? { ...r, rpassword: newPassword } : r))
      );
    }

    // Clean up reset session
    setResetSessions(prev => {
      const next = { ...prev };
      delete next[`${role}_${cleanEmail}`];
      return next;
    });

    if (data || !error) {
      setAuthSuccess('Password has been reset successfully! You can now log in.');
      return { success: true };
    }

    setAuthSuccess('Password has been reset successfully! You can now log in.');
    return { success: true };
  };

  const resetPasswordWithPhone = async ({ email, phone, role, newPassword, confirmPassword }) => {
    clearMessages();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim().replace(/[-\s]/g, '');

    if (newPassword !== confirmPassword) {
      setAuthError('Passwords do not match.');
      return { success: false, error: 'Passwords do not match.' };
    }
    if (newPassword.length < 4) {
      setAuthError('Password must be at least 4 characters long.');
      return { success: false, error: 'Password must be at least 4 characters long.' };
    }

    const { data, error } = await authAPI.resetPasswordWithPhone({
      email: cleanEmail,
      phone: cleanPhone,
      role,
      newPassword,
      confirmPassword,
    });

    if (data) {
      if (role === 'hospital') {
        setHospitals(prev =>
          prev.map(h => (h.hemail.toLowerCase() === cleanEmail ? { ...h, hpassword: newPassword } : h))
        );
      } else {
        setReceivers(prev =>
          prev.map(r => (r.remail.toLowerCase() === cleanEmail ? { ...r, rpassword: newPassword } : r))
        );
      }
      setAuthSuccess('Password has been reset successfully! You can now log in.');
      return { success: true };
    }

    // Fallback: verify phone locally
    if (role === 'hospital') {
      const hospital = hospitals.find(h => h.hemail.toLowerCase() === cleanEmail);
      if (!hospital) {
        setAuthError(error || 'No hospital found registered with this email address.');
        return { success: false, error: error || 'No hospital found registered with this email address.' };
      }
      if ((hospital.hphone || '').replace(/[-\s]/g, '') !== cleanPhone) {
        setAuthError('Phone number does not match registered hospital records.');
        return { success: false, error: 'Phone number does not match registered hospital records.' };
      }
      setHospitals(prev =>
        prev.map(h => (h.hemail.toLowerCase() === cleanEmail ? { ...h, hpassword: newPassword } : h))
      );
    } else {
      const receiver = receivers.find(r => r.remail.toLowerCase() === cleanEmail);
      if (!receiver) {
        setAuthError(error || 'No user account found registered with this email address.');
        return { success: false, error: error || 'No user account found registered with this email address.' };
      }
      if ((receiver.rphone || '').replace(/[-\s]/g, '') !== cleanPhone) {
        setAuthError('Phone number does not match registered user records.');
        return { success: false, error: 'Phone number does not match registered user records.' };
      }
      setReceivers(prev =>
        prev.map(r => (r.remail.toLowerCase() === cleanEmail ? { ...r, rpassword: newPassword } : r))
      );
    }

    setAuthSuccess('Password has been reset successfully! You can now log in.');
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        hospitals,
        receivers,
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
        resetPasswordWithPhone,
        clearMessages,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
