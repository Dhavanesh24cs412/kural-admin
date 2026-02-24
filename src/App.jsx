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
import Login from "./pages/Login";
import GeoMonitoring from "./pages/GeoMonitoring";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <AdminLayout>
            <Navigate to="/dashboard" replace />
          </AdminLayout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        }
      />
      <Route
        path="/citizens"
        element={
          <AdminLayout>
            <Citizens />
          </AdminLayout>
        }
      />
      <Route
        path="/schemes"
        element={
          <AdminLayout>
            <Schemes />
          </AdminLayout>
        }
      />
      <Route
        path="/eligibility"
        element={
          <AdminLayout>
            <Eligibility />
          </AdminLayout>
        }
      />
      <Route
        path="/segments"
        element={
          <AdminLayout>
            <Segments />
          </AdminLayout>
        }
      />
      <Route
        path="/intelligence"
        element={
          <AdminLayout>
            <Intelligence />
          </AdminLayout>
        }
      />
      <Route
        path="/monitoring/geographic"
        element={
          <AdminLayout>
            <GeoMonitoring />
          </AdminLayout>
        }
      />
      <Route
        path="/campaigns/:campaignId"
        element={
          <AdminLayout>
            <CampaignPreview />
          </AdminLayout>
        }
      />
    </Routes>
  );
}
