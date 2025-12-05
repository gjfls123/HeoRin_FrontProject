import React from "react";
import { Outlet } from "react-router-dom";
import AdminLeft from "../components/container/admin/AdminLeft";
import AdminHeader from "../components/container/admin/AdminHeader";
import ScrollTop from "../components/common/ScrollTop";

const AdminLayout = () => {
  return  (

    <>    
    <ScrollTop/>
      <div className="admin-left">
        <AdminLeft/>
        <div className="admin-right">
          <AdminHeader/>
          <Outlet />
        </div>
      </div>
    </>
    
    )
};

export default AdminLayout;
