import React, { useEffect, useState } from "react";
import { DB_SERVER_URL } from "../../../apis/commonApis";
import axios from "axios";
import AdminOrderPaymentModal from "./AdminOrderPaymentModal";
import { useSelector } from "react-redux";

const AdminOrderPaymentContainer = () => {
  const [paymentDetail, setPaymentDetail] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [situation, setSituation] = useState([]);

  // 페이징
  const reversePayment = [...paymentDetail].reverse();

  const [currentPage, setCurrentPage] = useState(1);
  const itemPages = 10;
  const totalPages = Math.ceil(paymentDetail.length / itemPages);

  // 몇번 페이지
  const pageClick = (page) => {
    setCurrentPage(page);
  };

  const getCurrentItem = () => {
    // ex) 1페이지 -> 0번쨰 객체 / 2페이지 -> 10번쨰 객체
    const start = (currentPage - 1) * itemPages;
    // 10번째 객체 / 20번째 객체
    const end = start + itemPages;

    return reversePayment.slice(start, end);
  };

  useEffect(() => {
    if (paymentDetail.length > 0) {
      const init = paymentDetail.map((el) => ({
        id: el.id,
        situation: el.situation,
      }));
      setSituation(init);
    }
  }, [paymentDetail]);

  const updateFn = async (id, value) => {
    const target = paymentDetail.find((item) => item.id === id);
    if (!target) return;

    const updateData = {
      ...target,
      situation: value,
    };

    await axios.put(`${DB_SERVER_URL}/payment/${paymentId}`, updateData);
  };

  const handleChange = (id, value) => {
    setSituation((prev) =>
      prev.map((item) => {
        return item.id === id ? { ...item, situation: value } : item;
      })
    );

    updateFn(id, value);
  };

  console.log(paymentDetail);
  console.log(situation);

  useEffect(() => {
    const OrderPaymentFn = async () => {
      try {
        const res = await axios.get(`${DB_SERVER_URL}/payment`);
        setPaymentDetail(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    OrderPaymentFn();
  }, []);

  const ClickModalFn = () => {
    setIsOpen(true);
  };

  console.log(isOpen);
  console.log(paymentId);

  return (
    <>
      {isOpen === true && (
        <AdminOrderPaymentModal setIsOpen={setIsOpen} paymentId={paymentId} />
      )}
      <div className="order-payment-page">
        <div className="order-payment-page-con">
          <div className="order-payment-title">
            <h2>주문관리</h2>
          </div>
          <table>
            <th>주문일</th>
            <th>주문자</th>
            <th>수령방법</th>
            <th>결제방식</th>
            <th>주문상태</th>
            <th className="orderDetails">주문내역</th>

            {paymentDetail &&
              getCurrentItem().map((el) => {
                const current = situation.find((s) => s.id === el.id);
                const receiveText = {
                  deliveryOK: "택배",
                  visit: "매장방문",
                };
                const paymethodText = {
                  kakaopay: "카카오페이",
                  accountTransfer: "계좌이체",
                };
                return (
                  <>
                    <tr>
                      <td>{el.paymentDate}</td>
                      <td>{el.userName}</td>
                      <td>{receiveText[el.receive]}</td>
                      <td>{paymethodText[el.paymethod]}</td>
                      <td className="select">
                        <select
                          name="situation"
                          id="situation"
                          value={current?.situation || "beforePayment"}
                          onClick={() => {
                            setPaymentId(el.id);
                          }}
                          onChange={(e) => {
                            handleChange(el.id, e.target.value);
                          }}
                        >
                          <option value="beforePayment">결제확인 전</option>
                          <option value="delivery">배송준비</option>
                          <option value="inDelivery">배송중</option>
                          <option value="receipt">수령완료</option>
                          <option value="cancel">주문취소</option>
                        </select>
                      </td>
                      <td
                        className="button"
                        onClick={() => {
                          ClickModalFn();
                          setPaymentId(el.id);
                        }}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        보기
                      </td>
                    </tr>
                  </>
                );
              })}
          </table>
        </div>
        <div className="pageIndex">
          <button
            onClick={() => {
              pageClick(currentPage - 1);
            }}
            disabled={currentPage === 1}
          >
            이전
          </button>
          {[...Array(totalPages)].map((el, idx) => {
            const page = idx + 1;
            return (
              <button
                onClick={() => {
                  pageClick(page);
                }}
                className="pagesIndex"
                style={{
                  backgroundColor: currentPage === page ? "red" : null,
                  color: currentPage === page ? "white" : null,
                }}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() => {
              pageClick(currentPage + 1);
            }}
            disabled={currentPage === totalPages}
          >
            다음
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminOrderPaymentContainer;
