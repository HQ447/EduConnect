import React from "react";
import { Outlet } from "react-router-dom";
import TeacherSidebar from "../components/Teacher-dashboard-components/TeacherSidebar";

function TeacherDashboard() {
  return (
    <div>
      <div className="flex ">
        <TeacherSidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default TeacherDashboard;
