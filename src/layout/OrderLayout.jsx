import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./../components/common/Header";
import Footer from "../components/common/Footer";
import ScrollTop from "../components/common/ScrollTop";

const OrderLayout = () => {
  return (
    <>
      <ScrollTop/>
      <Header />
      <Outlet />
      <Footer/>
    </>
  );
};

export default OrderLayout;
