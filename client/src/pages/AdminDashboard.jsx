import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/Admin-dasboard-components/AdminSidebar";

function AdminDashboard() {
  return (
    <div>
      <div className="flex ">
        <AdminSidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;
