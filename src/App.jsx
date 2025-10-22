import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";        // file: src/pages/Homepage.jsx
import Signup from "./pages/SignUp";            // file: src/pages/SignUp.jsx
import SavingsOptions from "./pages/SavingsOptions"; // src/pages/SavingsOptions.jsx
import UserInfo from "./pages/UserInfo";        // src/pages/UserInfo.jsx
import Dashboard from "./pages/Dashboard";      // src/pages/Dashboard.jsx

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/options" element={<SavingsOptions />} />
      <Route path="/userinfo" element={<UserInfo />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
