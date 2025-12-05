import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import ScrollTop from "../components/common/ScrollTop";

const CartLayout = () => {
  return (
    <>
      <ScrollTop/>
      <Header />
      <Outlet />
    </>
  );
};

export default CartLayout;
