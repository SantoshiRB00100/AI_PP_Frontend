import { Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import StudentLayout from "./layouts/StudentLayout";
import CompanyLayout from "./layouts/CompanyLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";

import StudentDashboard from "./pages/student/Dashboard";
import StudentProfile from "./pages/student/Profile";
import StudentResume from "./pages/student/Resume";
import StudentJobs from "./pages/student/Jobs";
import JobDetails from "./pages/student/JobDetails";
import StudentApplications from "./pages/student/Applications";

import CompanyDashboard from "./pages/company/Dashboard";
import CompanyMyJobs from "./pages/company/MyJobs";
import CompanyJobForm from "./pages/company/JobForm";
import CompanyApplicants from "./pages/company/Applicants";

import AdminDashboard from "./pages/admin/Dashboard";
import AdminPendingJobs from "./pages/admin/PendingJobs";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
      <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />

      {/* Student */}
      <Route path="/student/dashboard" element={
        <ProtectedRoute allowedRoles={["student"]}>
          <StudentLayout title="Dashboard"><StudentDashboard /></StudentLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/profile" element={
        <ProtectedRoute allowedRoles={["student"]}>
          <StudentLayout title="My Profile"><StudentProfile /></StudentLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/resume" element={
        <ProtectedRoute allowedRoles={["student"]}>
          <StudentLayout title="Resume & AI Analysis"><StudentResume /></StudentLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/jobs" element={
        <ProtectedRoute allowedRoles={["student"]}>
          <StudentLayout title="Browse Jobs"><StudentJobs /></StudentLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/jobs/:id" element={
        <ProtectedRoute allowedRoles={["student"]}>
          <StudentLayout title="Job Details"><JobDetails /></StudentLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/applications" element={
        <ProtectedRoute allowedRoles={["student"]}>
          <StudentLayout title="My Applications"><StudentApplications /></StudentLayout>
        </ProtectedRoute>
      } />

      {/* Company */}
      <Route path="/company/dashboard" element={
        <ProtectedRoute allowedRoles={["company"]}>
          <CompanyLayout title="Dashboard"><CompanyDashboard /></CompanyLayout>
        </ProtectedRoute>
      } />
      <Route path="/company/jobs" element={
        <ProtectedRoute allowedRoles={["company"]}>
          <CompanyLayout title="My Jobs"><CompanyMyJobs /></CompanyLayout>
        </ProtectedRoute>
      } />
      <Route path="/company/jobs/create" element={
        <ProtectedRoute allowedRoles={["company"]}>
          <CompanyLayout title="Post a Job"><CompanyJobForm /></CompanyLayout>
        </ProtectedRoute>
      } />
      <Route path="/company/jobs/:id/edit" element={
        <ProtectedRoute allowedRoles={["company"]}>
          <CompanyLayout title="Edit Job"><CompanyJobForm /></CompanyLayout>
        </ProtectedRoute>
      } />
      <Route path="/company/applicants" element={
        <ProtectedRoute allowedRoles={["company"]}>
          <CompanyLayout title="Applicants"><CompanyApplicants /></CompanyLayout>
        </ProtectedRoute>
      } />

      {/* Admin */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminLayout title="Dashboard"><AdminDashboard /></AdminLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/pending-jobs" element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminLayout title="Pending Jobs"><AdminPendingJobs /></AdminLayout>
        </ProtectedRoute>
      } />

      {/* 404 */}
      <Route path="*" element={
        <PublicLayout>
          <div className="flex min-h-[70vh] items-center justify-center text-white/60">
            404 — Page not found
          </div>
        </PublicLayout>
      } />
    </Routes>
  );
}

export default App;