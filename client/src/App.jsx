import { Routes, Route, NavLink } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/AuthPages/Login";
import Register from "./pages/AuthPages/Register";
import ForgotPassword from "./pages/AuthPages/ForgotPassword";
import VerifyOTP from "./pages/AuthPages/VerifyOTP";
import ResetPassword from "./pages/AuthPages/ResetPassword";
import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherHome from "./components/Teacher-dashboard-components/TeacherHome";
import Profile from "./components/Teacher-dashboard-components/Profile";
import Messages from "./components/Teacher-dashboard-components/Messages";
import Notification from "./components/Teacher-dashboard-components/Notification";
import Settings from "./components/Teacher-dashboard-components/Settings";
import AdminDashboard from "./pages/AdminDashboard";
import AdminHome from "./components/Admin-dasboard-components/AdminHome";
import AdminManagement from "./components/Admin-dasboard-components/AdminManagement";
import AdminMessages from "./components/Admin-dasboard-components/AdminMessages";
import AdminNotification from "./components/Admin-dasboard-components/AdminNotification";
import AdminSettings from "./components/Admin-dasboard-components/AdminSettings";
import StudentDashboard from "./pages/StudentDashboard";
import Category from "./components/student-dashboard-component/Category";
import Saved from "./components/student-dashboard-component/Saved";
import Nearby from "./components/student-dashboard-component/Nearby";
import StudentMessages from "./components/student-dashboard-component/Chat";
import StudentNotification from "./components/student-dashboard-component/Notification";
import StudentSettings from "./components/student-dashboard-component/Settings";
import TeacherManagement from "./components/Admin-dasboard-components/TeacherManagement";
import StudentManagement from "./components/Admin-dasboard-components/StudentManagement";
//import RegisteredTeachers from "./components/Admin-dasboard-components/RegisteredTeachers";
import TeacherDetail from "./components/student-dashboard-component/TeacherDetail";
import Chat from "./components/student-dashboard-component/Chat";
import ChatSystem from "./components/Teacher-dashboard-components/ChatSystem";
import ChatFrontPage from "./components/Teacher-dashboard-components/ChatFrontPage";
import StudentChatFront from "./components/student-dashboard-component/StudentChatFront";
import StudentChatSystem from "./components/student-dashboard-component/StudentChatSystem";
import Feedback from "./components/Teacher-dashboard-components/Feedback";

function App() {
  return (
    <div className="">
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/verifyotp" element={<VerifyOTP />} />
        <Route path="/resetPassword" element={<ResetPassword />} />

        {/* student Dashboard */}
        <Route path="/student-dashboard" element={<StudentDashboard />}>
          <Route index element={<Category />} />
          <Route path="saved-teacher" element={<Saved />} />
          <Route path="nearby" element={<Nearby />} />
          <Route path="teacher-detail/:id" element={<TeacherDetail />} />
          <Route path="studentChatSystem" element={<StudentChatSystem />}>
            <Route index element={<StudentChatFront />} />
            <Route path="student-chat/:tutorId" element={<Chat />} />
          </Route>

          <Route
            path="student-notification"
            element={<StudentNotification />}
          />
          <Route path="student-settings" element={<StudentSettings />} />
        </Route>

        {/* Teacher Dashboard */}
        <Route path="/teacher-dashboard" element={<TeacherDashboard />}>
          <Route index element={<TeacherHome />} />
          <Route path="profile" element={<Profile />} />
          <Route path="chatSystem" element={<ChatSystem />}>
            <Route index element={<ChatFrontPage />} />
            <Route path="tutor-chat/:studentId" element={<Messages />} />
          </Route>

          <Route path="notification" element={<Notification />} />
          <Route path="feedbacks" element={<Feedback />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        {/* Admin Dashboard */}
        <Route path="/admin-dashboard" element={<AdminDashboard />}>
          <Route index element={<AdminHome />} />
          <Route path="cat-management" element={<AdminManagement />} />
          <Route path="student-management" element={<StudentManagement />} />
          <Route path="teacher-management" element={<TeacherManagement />} />
          <Route path="admin-messages" element={<AdminMessages />} />
          <Route path="admin-notification" element={<AdminNotification />} />
          <Route path="admin-settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
