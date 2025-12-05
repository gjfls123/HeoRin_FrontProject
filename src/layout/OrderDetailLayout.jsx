import React, { useRef } from "react";
import Header from "../components/common/Header";
import { Outlet } from "react-router-dom";
import ScrollTop from "../components/common/ScrollTop";


const OrderDetailLayout = () => {
  return (
    <>
      <ScrollTop />
      <Header />
      <Outlet />
    </>
  );
};

export default OrderDetailLayout;
