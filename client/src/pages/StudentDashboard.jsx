import React from "react";
import { Outlet } from "react-router-dom";
import StudentSidebar from "../components/student-dashboard-component/StudentSidebar";

function StudentDashboard() {
  return (
    <div>
      <div className="flex ">
        <StudentSidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default StudentDashboard;
