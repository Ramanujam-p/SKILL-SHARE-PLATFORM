import { Routes, Route, Navigate } from "react-router-dom";
import type { JSX } from "react";

import { LandingPage } from "./landing/pages/LandingPage";
import { LoginPage } from "./landing/pages/login-page";
import { ProfileSetupPage } from "./landing/pages/profile-setup-page";

import DashboardApp from "./DashboardApp";
import { ProtectedRoute } from "../components/ProtectedRoute";

export default function App(): JSX.Element {
  return (
    <Routes>
      {/* Landing */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />

      {/* Onboarding */}
      <Route path="/onboarding" element={<ProfileSetupPage />} />

      {/* Dashboard */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <DashboardApp />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
