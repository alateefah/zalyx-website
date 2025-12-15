import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ComingSoon from "./components/ComingSoon";
import PrivacyPolicy from "./pages/privacy";
import TermsAndConditions from "./pages/terms";
import LandingPage from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
      </Routes>
    </Router>
  );
}

export default App;
