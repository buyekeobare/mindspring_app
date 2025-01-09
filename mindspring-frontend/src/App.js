import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutPage from "./components/layout/LayoutPage";

const HomePage = lazy(() => import("./components/homepage/HomePage"));
const AboutPage = lazy(() =>  import("./components/about/AboutPage"));
const ContactPage = lazy(() =>  import("./components/contact/ContactPage"));
// features route added
const FeaturesPage = lazy(() => import("./components/features/FeaturesPage"));
const MeditationPage = lazy(() => import("./components/meditation/MeditationPage"))
const LoginPage = lazy(() => import("./components/login/LoginPage"));

const App = () => {
  return (
    <Router>
      <LayoutPage>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/meditation" element={<MeditationPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/features"
              element={
                <ProtectedRoute>
                  <FeaturesPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </LayoutPage>
    </Router>
  );
};

export default App;