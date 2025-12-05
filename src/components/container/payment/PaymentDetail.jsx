import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { DB_SERVER_URL } from "../../../apis/commonApis";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PaymentMapModal from "./PaymentMapModal";

const PaymentDetail = () => {
  const userData = useSelector((state) => state.auth.loginUser);

  const [isOpen, setIsOpen] = useState(false);
  const [userPayment, setUserPayment] = useState([]);
  const [tShop, setTShop] = useState();

  const clickFn = (e) => {
    console.log(e.target);
    console.log(e.target.innerText);
    setTShop(e.target.innerText);

    setIsOpen(true);
  };

  // console.log(userPayment);

  useEffect(() => {
    const paymentDetailFn = async () => {
      try {
        const res = await axios.get(`${DB_SERVER_URL}/payment`);

        const paymentData = res.data.filter((el) => {
          return el.userEmail === userData[0].userEmail;
        });

        setUserPayment(paymentData);
      } catch (err) {
        console.log(err);
      }
    };
    paymentDetailFn();
  }, []);

  const reverseUserPayment = [...userPayment].reverse();

  return (
    <>
      {isOpen === true && (
        <PaymentMapModal
          setIsOpen={setIsOpen}
          userPayment={userPayment}
          tShop={tShop}
        />
      )}
      <div className="payment-detail">
        <div className="payment-detail-con">
          <div className="payment-detail-top">
            <h1>주문정보</h1>
          </div>
          <div className="payment-detail-list">
            <table>
              <th>주문날짜</th>
              <th>상품정보</th>
              <th>수령방법</th>
              <th>배송비</th>
              <th>진행상태</th>

              {reverseUserPayment.map((el) => {
                const receiveText = {
                  deliveryOK: "택배",
                  visit: "매장방문",
                };

                const situationText = {
                  beforePayment: "결제확인 전",
                  delivery: "배송준비",
                  inDelivery: "배송중",
                  receipt: "수령완료",
                  cancel: "주문취소",
                };

                return (
                  <tr>
                    <td>{el.paymentDate}</td>
                    <td className="itemImg">
                      {el.items.map((item) => {
                        return (
                          <>
                            <div className="paymentItemDetail">
                              <div className="img">
                                <img src={item.img} alt="img" />
                              </div>
                              <div className="titelPrice">
                                <li>{item.name}</li>
                                <div className="detail-con">
                                  <li>{item.count}개</li>
                                  <span>/</span>
                                  <li>{item.price}원</li>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </td>

                    <td className="receive">
                      <li>{receiveText[el.receive]}</li>
                      {el.receive === "visit" ? (
                        <li onClick={clickFn}>
                          <span>{el.location}</span>
                        </li>
                      ) : null}
                    </td>
                    <td>{el.receive !== "visit" ? "3,000원" : "0원"}</td>
                    <td className="situation">{situationText[el.situation]}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentDetail;
