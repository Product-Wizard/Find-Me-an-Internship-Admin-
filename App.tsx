import React, { useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
  Outlet,
} from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Settings,
  LogOut,
  GraduationCap,
  Bell,
  Search as SearchIcon,
  Menu,
  X,
} from "lucide-react";

import { AdminLogin } from "./components/AdminLogin";
import AdminJobManagerPage from "./pages/AdminJobManagerPage";
import { AdminResourceManager } from "./pages/AdminResourceManager";
import { PlacementsChart, DiversityChart } from "./components/ImpactCharts";
import { AICareerCoach } from "./components/AICareerCoach";
import { Article } from "./types";
import OverViewPage from "./pages/OverViewPage";
import SettingsPage from "./pages/SettingsPage";
import DashboardLayout from "./components/DashboardLayout";
import UserStore from "./store/User.store";
import StudentsPage from "./pages/StudentsPage";
import OrganizationsPage from "./pages/OrganizationsPage";
import JobApplicationPage from "./pages/JobApplicationPage";

// Sidebar Item Component

// Layout Component

// Components for Routes

// Main App Component with Router
const App: React.FC = () => {
  const { token, setToken, setUser } = UserStore();
  const handleLogout = () => {
    setToken("");
    setUser(null);
  };

  return (
    <Routes>
      <Route
        path='/login'
        element={
          token ? <Navigate to='/admin/overview' replace /> : <AdminLogin />
        }
      />

      <Route
        path='/admin'
        element={
          token ? (
            <DashboardLayout onLogout={handleLogout} />
          ) : (
            <Navigate to='/login' replace />
          )
        }
      >
        <Route path='overview' element={<OverViewPage />} />
        <Route path='students' element={<StudentsPage />} />
        <Route path='organizations' element={<OrganizationsPage />} />
        <Route path='job_applications' element={<JobApplicationPage />} />
        <Route path='jobs' element={<AdminJobManagerPage />} />
        <Route path='resources' element={<AdminResourceManager />} />
        <Route path='settings' element={<SettingsPage />} />
        <Route index element={<Navigate to='overview' replace />} />
      </Route>

      {/* hsndle unfound route */}
      <Route path='/' element={<Navigate to='/admin/overview' replace />} />
      <Route path='*' element={<Navigate to='/admin/overview' replace />} />
    </Routes>
  );
};

export default App;
