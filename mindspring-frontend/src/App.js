import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutPage from "./components/layout/LayoutPage";

// Lazy load pages
const HomePage = lazy(() => import("./components/homepage/HomePage"));
const AboutPage = lazy(() => import("./components/about/AboutPage"));
const ContactPage = lazy(() => import("./components/contact/ContactPage"));
const PeerSupportPage = lazy(() => import("./components/peersupport/PeerSupportPage")); 
const StressJournalingPage = lazy(() => import("./components/stressjournaling/StressJournalingPage")); 
const MeditationPage = lazy(() => import("./components/meditation/MeditationPage")); 

const App = () => {
  return (
    <Router>
      <LayoutPage>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/features/peer-support" element={<PeerSupportPage />} />
            <Route path="/features/stress-journaling" element={<StressJournalingPage />} />
            <Route path="/features/meditation" element={<MeditationPage />} /> 
          </Routes>
        </Suspense>
      </LayoutPage>
    </Router>
  );
};

export default App;