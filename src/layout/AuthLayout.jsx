import React from "react";
import { Outlet } from "react-router-dom";
import ScrollTop from "../components/common/ScrollTop";

const AuthLayout = () => {
  return (
    <>
    <ScrollTop/>
    <Outlet />;
    </>
  )
};

export default AuthLayout;
