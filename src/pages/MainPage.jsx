import React from "react";
import MainContainer from "../components/container/MainContainer";
import Header from "../components/common/Header";
import Slide from "../components/common/Slide";
import Footer from "../components/common/Footer";
import Map from "../components/common/Map";
import OrderBestContainer from "../components/container/order/OrderBestContainer";

const MainPage = () => {
  return(

    <>
  <Header/>
  <Slide/>
  <MainContainer/>
  <OrderBestContainer/>
  <Map/>
  <Footer/>
  </>
  )
  
};

export default MainPage;
