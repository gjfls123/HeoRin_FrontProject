import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPayment, paymentDeleteFn } from "../../../slice/paymentSlice";
import { ResetFn } from "../../../slice/cartSlice";
import { DB_SERVER_URL } from "../../../apis/commonApis";
import axios from "axios";

const PaymentIndex = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const hour = today.getHours();
  const minutes = today.getMinutes();

  const paymentData = {
    paymentDate: "",
    userEmail: "",
    userName: "",
    address: "",
    location: "",
    receive: "",
    paymethod: "",
    totalAmount: "",
    situation: "",
    items: [],
  };

  const checkItem = useSelector((state) => state.cart.checkItem);
  const loginUser = useSelector((state) => state.auth.loginUser);
  const receiveMethod = useSelector((state) => state.cart.receive);
  const paymentItem = useSelector((state) => state.payment.payment);

  const [PaymnetDetail, setPaymentDetail] = useState(paymentData);
  const [paymentMethod, setPaymemtMethod] = useState("kakaopay");
  const [orderMap, setOrderMap] = useState([]);
  const [orderPoint, setOrderPoint] = useState("노원점");

  const dispatch = useDispatch();

  console.log(orderMap);

  let totalAmount = 0;

  paymentItem.length > 0 &&
    paymentItem.forEach((el) => {
      totalAmount += el.price * el.count;
    });

  paymentItem.length === 0 &&
    checkItem.forEach((el) => {
      totalAmount += el.price * el.count;
    });

  const parcelMoney = receiveMethod === "deliveryOK" ? 3000 : 0;

  useEffect(() => {
    const userCheckFn = async () => {
      try {
        const res = await axios.get(`${DB_SERVER_URL}/members`);
        const num = res.data.findIndex((el) => {
          return el.userEmail === loginUser[0].userEmail;
        });

        if (num !== -1) {
          const userDetail = res.data[num];

          const updatePayment = {
            ...paymentData,
            paymentDate: `${year}/${month}/${day} ${hour}:${minutes}`,
            userEmail: userDetail.userEmail,
            userName: userDetail.userName,
            address: userDetail.address,
            location: orderPoint,
            receive: receiveMethod,
            paymethod: paymentMethod,
            totalAmount: totalAmount + parcelMoney,
            situation: "beforePayment",
            items: paymentItem.length > 0 ? paymentItem : checkItem,
          };
          setPaymentDetail(updatePayment);
        } else {
          return alert("회원 정보가 없습니다");
        }
      } catch (err) {
        alert(err);
      }
    };
    userCheckFn();
  }, [orderPoint]);

  useEffect(() => {
    const orderMapFn = async () => {
      try {
        const res = await axios.get(`${DB_SERVER_URL}/order`);
        setOrderMap(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    orderMapFn();
  }, []);

  console.log(orderMap);

  useEffect(() => {
    return () => {
      dispatch(paymentDeleteFn());
    };
  }, [dispatch]);

  const navigate = useNavigate();

  return (
    <div className="paymentPage">
      <div className="payment-title">
        <h1>주문서</h1>
      </div>
      <div className="paymentPage-con">
        <div className="payment-detail-con">
          <div className="payment-detail-left-con">
            <div className="paymentPage-top">
              <span>주문자 정보</span>
              <div className="payment-receive-method">
                <span>수령방법</span>
                {receiveMethod && receiveMethod === "deliveryOK" ? (
                  <span>택배</span>
                ) : (
                  <>
                    <span className="pay-visit-span">방문</span>
                    <div className="pay-visit">
                      <select
                        name="location"
                        id="location"
                        // value={orderMap[0].name}
                        onChange={(e) => {
                          setOrderPoint(e.target.value);
                        }}
                      >
                        {orderMap.map((el) => {
                          return <option value={el.name}>{el.name}</option>;
                        })}
                      </select>
                    </div>
                  </>
                )}
              </div>
              <div className="pay-userName">
                <span>성함</span>
                <span>{PaymnetDetail.userName}</span>
              </div>
              <div className="pay-userAddress">
                <span>주소</span>
                <span>{PaymnetDetail.address}</span>
              </div>
            </div>
            <div className="paymentPage-bottom">
              <div className="payment-cart">
                <div className="payment-cart-detail">
                  <span>주문 상품</span>
                  <ul>
                    {paymentItem.length > 0 &&
                      paymentItem.map((el) => {
                        return (
                          <>
                            <div className="payment-itemList">
                              <li className="paymentCart-Img">
                                <img src={el.img} alt="paymentImg" />
                              </li>
                              <li className="paymentCart-Name">{el.name}</li>
                              <li className="paymentCart-Count">
                                {el.count}개
                              </li>
                              <li className="paymentCart-price">
                                {(el.price * el.count).toLocaleString()}원
                              </li>
                            </div>
                          </>
                        );
                      })}
                    {paymentItem.length === 0 &&
                      checkItem.map((el) => {
                        return (
                          <>
                            <div className="payment-itemList">
                              <li className="paymentCart-Img">
                                <img src={el.img} alt="paymentImg" />
                              </li>
                              <li className="paymentCart-Name">{el.name}</li>
                              <li className="paymentCart-Count">
                                {el.count}개
                              </li>
                              <li className="paymentCart-price">
                                {(el.price * el.count).toLocaleString()}원
                              </li>
                            </div>
                          </>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="payment-side">
            <div className="side-title">
              <span>결제금액</span>
            </div>
            <div className="payment-totalAmount">
              <span>주문금액</span>
              <span>{totalAmount.toLocaleString()}원</span>
            </div>
            <div className="payment-delivery-con">
              <span>택배비</span>
              <span className="delivery-payment">
                {parcelMoney.toLocaleString()}원
              </span>
            </div>

            <div className="paymethod-con">
              <span>결제방식</span>
              <select
                name="paymethod"
                id="paymethod"
                value={paymentMethod}
                onChange={(e) => {
                  setPaymemtMethod(e.target.value);
                }}
              >
                <option value="kakaopay">카카오페이</option>
                <option value="accountTransfer">계좌이체</option>
              </select>
            </div>
            <div className="payment-button">
              <button
                className="totalAmount"
                onClick={() => {
                  navigate("/payment/success");
                  dispatch(addPayment(PaymnetDetail));
                  dispatch(ResetFn());
                }}
              >
                {(totalAmount + parcelMoney).toLocaleString()}원 결제하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentIndex;
