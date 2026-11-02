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
        clearMessages,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
