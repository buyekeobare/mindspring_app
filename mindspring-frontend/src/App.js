// importing react toastify
// updated
import 'react-toastify/ReactToastify.css';
import {ToastContainer } from 'react-toastify';
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutPage from "./components/layout/LayoutPage";
import './styles/App.css';

// Lazy load pages
const HomePage = lazy(() => import("./components/homepage/HomePage"));
const AboutPage = lazy(() => import("./components/about/AboutPage"));
const ContactPage = lazy(() => import("./components/contact/ContactPage"));
const FeaturesPage = lazy(() => import("./components/features/FeaturesPage"));
const SignUpPage = lazy(() => import("./components/signup/SignUpPage"))
const LoginPage = lazy(() => import("./components/login/LoginPage"));
const ProtectedRoute = lazy(() => import("./components/routes/ProtectedRoute"));
const PeerSupportPage = lazy(() => import("./components/peersupport/PeerSupportPage")); 
const StressJournalingPage = lazy(() => import("./components/stressjournaling/StressJournalingPage")); 
const MeditationPage = lazy(() => import("./components/meditation/MeditationPage"));
const AnalyticsPage = lazy(() => import("./components/analytics/AnalyticsPage"));

const App = () => {
  return (
    <>
      <Router>
      <LayoutPage>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/features"
              element={
                <ProtectedRoute>
                  <FeaturesPage />
                </ProtectedRoute>
              }
            />
            <Route path="/features/peer-support" element={<PeerSupportPage />} />
            <Route path="/features/stress-journaling" element={<StressJournalingPage />} />
            <Route path="/features/meditation" element={<MeditationPage />} /> 
            <Route path="/analytics" element={<AnalyticsPage />} />
          </Routes>
        </Suspense>
      </LayoutPage>
    </Router>
    <ToastContainer/>
    </>
    
  );
};

export default App;
