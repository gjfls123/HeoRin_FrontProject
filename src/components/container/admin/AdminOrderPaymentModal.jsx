import React, { useEffect, useState } from "react";
import { DB_SERVER_URL } from "../../../apis/commonApis";
import axios from "axios";
const AdminOrderPaymentModal = ({ setIsOpen, paymentId }) => {
  const [orderUser, setOrderUser] = useState({});
  const [orderItem, setOrderItem] = useState([]);

  useEffect(() => {
    const orderPaymentDetailFn = async () => {
      const res = await axios.get(`${DB_SERVER_URL}/payment/${paymentId}`);
      setOrderUser(res.data);
      setOrderItem(res.data.items);
    };
    orderPaymentDetailFn();
  }, []);

  console.log(orderUser.totalAmount);

  return (
    <div className="orderPayment-modal">
      <div className="orderPayment-modal-con">
        <div className="order-modal-title">
          결제상세내역
          <span
            className="close-modal"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            X
          </span>
        </div>
        <div className="order-userDetail">
          <ul>
            <li>
              <span>이메일</span>
              <span>{orderUser.userEmail}</span>
            </li>
            <li>
              <span>주문자 이름</span>
              <span>{orderUser.userName}</span>
            </li>
            <li>
              <span>결제 총 금액</span>
              <span>
                {orderUser.totalAmount &&
                  orderUser.totalAmount.toLocaleString()}
                원
              </span>
            </li>
            <li>
              <span className="last">주소</span>
              <span>{orderUser.address}</span>
            </li>
            <li>
              <div className="order-title-con">주문 목록</div>

              {orderItem.map((el) => {
                return (
                  <div className="payment-item-detail">
                    <div className="item-img">
                      <img src={el.img} />
                    </div>
                    <span>{el.name}</span>
                    <span>{el.count}개</span>
                    <span>{(el.price * el.count).toLocaleString()}원</span>
                  </div>
                );
              })}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderPaymentModal;
