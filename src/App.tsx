import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ComingSoon from "./components/ComingSoon";
import PrivacyPolicy from "./pages/privacy";
import TermsAndConditions from "./pages/terms";
import LandingPage from "./pages";
import FieldOnboardingPartner from "./pages/field-onboarding-partner";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/field-onboarding-partner" element={<FieldOnboardingPartner />} />
      </Routes>
    </Router>
  );
}

export default App;
