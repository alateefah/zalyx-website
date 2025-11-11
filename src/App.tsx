import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import ComingSoon from './components/ComingSoon';
import PrivacyPolicy from "./pages/privacy";
import TermsAndConditions from "./pages/terms";

function App() {
    return (
        <Router>
        <Routes>
            <Route path="/" element={<ComingSoon />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsAndConditions />} />
        </Routes>
        </Router>
    );
}

export default App;
