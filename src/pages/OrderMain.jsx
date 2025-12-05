import React, { useRef } from 'react'
import Slide from '../components/common/Slide'
import MainContainer from '../components/container/MainContainer'
import OrderBestContainer from '../components/container/order/OrderBestContainer'
import Map from '../components/common/Map'
import MainScroll from '../components/common/MainScroll'

const OrderMain = () => {
  const mainContainerRef = useRef(null);
    const mapRef = useRef(null);
  
    const mainScroll = (ref) => {
      ref.current.scrollIntoView({ behavior: "smooth" });
    };
  return (
    <>
    <Slide/>
      <div ref={mainContainerRef} className='scroll-top1'>
        <MainContainer />
      </div>
      <OrderBestContainer/>
      <div ref={mapRef} className='scroll-top2'>
        <Map/>
      </div>
      <MainScroll
        onScrollMain={() => mainScroll(mainContainerRef)}
        onScrollMap={() => mainScroll(mapRef)}
      />
  {/* <Footer/> */}
    </>
  )
}

export default OrderMain