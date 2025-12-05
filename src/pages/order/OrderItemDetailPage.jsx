import React, { useRef } from "react";
import OrderItemDetailContainer from "../../components/container/order/OrderItemDetailContainer";
import OrderDetailScroll from "../../components/common/OrderDetailScroll";

const OrderItemDetailPage = () => {
  const OrderContainerRef = useRef(null);
        
      
        const detailScroll = (ref) => {
          ref.current.scrollIntoView({ behavior: "smooth" });
        };
  return (
    <>
      <div ref={OrderContainerRef} className="detail-scroll">
      <OrderItemDetailContainer />;
    </div>
    <OrderDetailScroll
        onScrollDetail={()=> detailScroll(OrderContainerRef)}
      />
    </>
  )
};

export default OrderItemDetailPage;
