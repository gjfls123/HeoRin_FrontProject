import axios from "axios";
import React, { useEffect, useState } from "react";
import { DB_SERVER_URL } from "../../../apis/commonApis";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PaymentSuccessContainer = () => {
  const payment = useSelector((state) => state.payment.paymentData);
  const userData = useSelector((state) => state.auth.loginUser);
  const [userId, setUserId] = useState();

  console.log(userId);

  useEffect(() => {
    const userIdFn = async () => {
      try {
        const res = await axios.get(`${DB_SERVER_URL}/members`);
        const num = res.data.findIndex((el) => {
          return el.userEmail === userData[0].userEmail;
        });
        setUserId(res.data[num].id);
      } catch (err) {
        console.log(err);
      }
    };
    userIdFn();
  }, []);

  console.log(payment);

  useEffect(() => {
    const paymentUrl = "http://192.168.23.231:3001/payment";
    const paymentPostFn = async () => {
      if (!payment[0]) return;
      try {
        const res = await axios.post(paymentUrl, payment[0]);
      } catch (err) {
        alert(err);
      }
    };
    paymentPostFn();
  }, []);

  const navigate = useNavigate();
  return (
    <div className="paymentSuccess">
      <div className="paymentSuccess-con">
        <div className="paymentSuccess-top">
          <div className="top-success">
            <img src="/images/payment.png" alt="payment" />
          </div>
          주문이 완료되었습니다.
        </div>
        <div className="paymentSuccess-bottom">
          <button
            onClick={() => {
              navigate("/main");
            }}
          >
            홈으로
          </button>
          <button
            onClick={() => {
              navigate(`/payment/detail/${userId}`);
            }}
          >
            주문내역확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessContainer;
