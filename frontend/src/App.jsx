import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BloodBankProvider } from './context/BloodBankContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Public pages
import HomePage from './pages/HomePage';
import BloodGuidePage from './pages/BloodGuidePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Hospital pages
import HospitalDashboard from './pages/HospitalDashboard';
import HospitalStockPage from './pages/HospitalStockPage';
import HospitalRequestsPage from './pages/HospitalRequestsPage';
import CommunityDonorsPage from './pages/CommunityDonorsPage';
import HospitalDonorStatusPage from './pages/HospitalDonorStatusPage';
import HospitalProfilePage from './pages/HospitalProfilePage';

// User / Donor pages
import UserDashboard from './pages/UserDashboard';
import FindBloodPage from './pages/FindBloodPage';
import UserMyRequestsPage from './pages/UserMyRequestsPage';
import UserDonatePage from './pages/UserDonatePage';
import UserDonationStatusPage from './pages/UserDonationStatusPage';
import UserProfilePage from './pages/UserProfilePage';

function ProtectedRoute({ children, role }) {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  if (role && currentUser.role !== role) {
    return <Navigate to={currentUser.role === 'hospital' ? '/hospital/dashboard' : '/user/dashboard'} replace />;
  }
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BloodBankProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              <Routes>
                {/* Public Routes & Compatibility Aliases */}
                <Route path="/" element={<HomePage />} />
                <Route path="/main" element={<HomePage />} />
                <Route path="/main.php" element={<HomePage />} />
                <Route path="/guide" element={<BloodGuidePage />} />
                <Route path="/index.php" element={<BloodGuidePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/about.php" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/contact.php" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/login.php" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/register.php" element={<RegisterPage />} />

                {/* Hospital Routes */}
                <Route
                  path="/hospital/dashboard"
                  element={
                    <ProtectedRoute role="hospital">
                      <HospitalDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="/hospitalpage.html" element={<Navigate to="/hospital/dashboard" replace />} />
                <Route path="/hospitalpage.php" element={<Navigate to="/hospital/dashboard" replace />} />
                <Route
                  path="/hospital/stock"
                  element={
                    <ProtectedRoute role="hospital">
                      <HospitalStockPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/bloodinfo.php" element={<Navigate to="/hospital/stock" replace />} />
                <Route
                  path="/hospital/requests"
                  element={
                    <ProtectedRoute role="hospital">
                      <HospitalRequestsPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/bloodrequest.php" element={<Navigate to="/hospital/requests" replace />} />
                <Route
                  path="/hospital/donors"
                  element={<CommunityDonorsPage />}
                />
                <Route path="/deleteit.php" element={<CommunityDonorsPage />} />
                <Route
                  path="/hospital/request-status"
                  element={
                    <ProtectedRoute role="hospital">
                      <HospitalDonorStatusPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/sentrequestd.php" element={<Navigate to="/hospital/request-status" replace />} />
                <Route
                  path="/hospital/profile"
                  element={
                    <ProtectedRoute role="hospital">
                      <HospitalProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/hprofile.php" element={<Navigate to="/hospital/profile" replace />} />

                {/* User / Donor Routes */}
                <Route
                  path="/user/dashboard"
                  element={
                    <ProtectedRoute role="receiver">
                      <UserDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="/Userpage.html" element={<Navigate to="/user/dashboard" replace />} />
                <Route path="/Userpage.php" element={<Navigate to="/user/dashboard" replace />} />
                <Route
                  path="/user/find-blood"
                  element={<FindBloodPage />}
                />
                <Route path="/abs.php" element={<FindBloodPage />} />
                <Route
                  path="/user/my-requests"
                  element={
                    <ProtectedRoute role="receiver">
                      <UserMyRequestsPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/sentrequest.php" element={<Navigate to="/user/my-requests" replace />} />
                <Route
                  path="/user/donate"
                  element={
                    <ProtectedRoute role="receiver">
                      <UserDonatePage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/blooddinfo.php" element={<Navigate to="/user/donate" replace />} />
                <Route
                  path="/user/donation-status"
                  element={
                    <ProtectedRoute role="receiver">
                      <UserDonationStatusPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/blooddonate.php" element={<Navigate to="/user/donation-status" replace />} />
                <Route
                  path="/user/profile"
                  element={
                    <ProtectedRoute role="receiver">
                      <UserProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/rprofile.php" element={<Navigate to="/user/profile" replace />} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </BloodBankProvider>
    </AuthProvider>
  );
}
