import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import DashboardPage from "./pages/DashboardPage";
import HistoryPage from "./pages/HistoryPage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/home" element={<Home />} />

        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/history" element={<HistoryPage />} />

        <Route path="/about" element={<AboutPage />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;