import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../src/pages/HomePage/HomePage";
import BudgetPage from "../src/pages/BudgetPage/BudgetPage";
import TransactionPage from "../src/pages/TransactionPage/TransactionPage";
import SettingPage from "../src/pages/SettingPage/SettingPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import SigninPage from "./pages/SigninPage/SigninPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import ComingsoonPage from "./pages/ComingsoonPage/ComingsoonPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/comingsoon" element={<ComingsoonPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/transaction" element={<TransactionPage />} />
        <Route path="/setting" element={<SettingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
