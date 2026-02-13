// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Citizens from "./pages/Citizens";
import Schemes from "./pages/Schemes";
import Eligibility from "./pages/Eligibility";
import Segments from "./pages/Segments";
import Intelligence from "./pages/Intelligence";
import CampaignPreview from "./pages/CampaignPreview";

export default function App() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/citizens" element={<Citizens />} />
        <Route path="/schemes" element={<Schemes />} />
        <Route path="/eligibility" element={<Eligibility />} />
        <Route path="/segments" element={<Segments />} />
        <Route path="/intelligence" element={<Intelligence />} />
        <Route path="/campaigns/:campaignId" element={<CampaignPreview />} />
      </Routes>
    </AdminLayout>
  );
}
