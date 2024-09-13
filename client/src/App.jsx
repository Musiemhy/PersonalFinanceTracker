import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../src/pages/HomePage/HomePage";
import BudgetPage from "../src/pages/BudgetPage/BudgetPage";
import TransactionPage from "../src/pages/TransactionPage/TransactionPage";
import SettingPage from "../src/pages/SettingPage/SettingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/transaction" element={<TransactionPage />} />
        <Route path="/setting" element={<SettingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
