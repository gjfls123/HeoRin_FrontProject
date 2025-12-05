import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  PlusFn,
  MinusFn,
  DeleteFn,
  checkedChange,
  allChecked,
  selectDeleteFn,
  receiveMethod,
} from "../../../slice/cartSlice";

const CartIndex = () => {
  const cart = useSelector((state) => state.cart.items);
  const checkItem = useSelector((state) => state.cart.checkItem);
  const islogin = useSelector((state) => state.auth.islogin);
  const receive = useSelector((state) => state.cart.receive);
  const dispatch = useDispatch();

  let totalAmount = 0;

  const parcelMoney = receive === "deliveryOK" ? 3000 : 0;

  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (cart.length > 0 && checkItem.length === 0 && isFirstLoad === true) {
      dispatch(allChecked(true));
      setIsFirstLoad(false);
    }
  }, [cart]);

  const navigate = useNavigate();
  return (
    <>
      <div className="cartIndex">
        <div className="cartIndex-con">
          {cart && cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-con">
                장바구니에 담은 상품이 없습니다.
                <button
                  onClick={() => {
                    navigate("/main");
                  }}
                >
                  홈으로
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="carIndex-header">
                <h1>장바구니</h1>
              </div>
              <div className="cartItem-con">
                <div className="cartIndex-left">
                  <div className="cart-select-check">
                    <div className="cart-check-all">
                      <input
                        type="checkbox"
                        name="allSelect"
                        id="allSelect"
                        className="allSelect"
                        onChange={(e) => {
                          dispatch(allChecked(e.target.checked));
                        }}
                        checked={checkItem.length === cart.length}
                      />
                      전체선택
                    </div>
                    {checkItem && checkItem.length <= 0 ? (
                      <button
                        className="delete-deactivate"
                        style={{
                          border: "1px solid #ccc",
                          color: "#ccc",
                          background: "#fff",
                          padding: "4px 9px",
                          fontSize: "14px",
                          borderRadius: "5px",
                        }}
                      >
                        선택삭제
                      </button>
                    ) : (
                      <button
                        className="all-delete"
                        onClick={() => {
                          if (
                            window.confirm("선택된 항목을 삭제하시겠습니까?")
                          ) {
                            dispatch(selectDeleteFn());
                          } else {
                            console.log("삭제 취소");
                          }
                        }}
                      >
                        선택삭제
                      </button>
                    )}
                  </div>
                  <ul>
                    {cart.map((el) => {
                      return (
                        <div className="cart-left-con">
                          <div className="cart-check">
                            <input
                              type="checkbox"
                              name="allSelect"
                              id="allSelect"
                              className="allSelect"
                              onChange={() => {
                                dispatch(checkedChange(el.id));
                              }}
                              checked={checkItem.some(
                                (item) => item.id === el.id
                              )}
                            />
                          </div>
                          <div className="cart-itemDetail">
                            <li className="cart-itemName">{el.name}</li>
                            <div className="cart-itemImgButton">
                              <li className="cart-itemImg">
                                <img src={el.img} alt="cartItemImg" />
                              </li>
                              <div className="cart-priceCount">
                                <li className="cart-price">
                                  {(el.count * el.price).toLocaleString()}원
                                </li>
                                <li className="cart-count">
                                  <button
                                    className="count"
                                    onClick={() => {
                                      dispatch(MinusFn({ id: el.id }));
                                    }}
                                  >
                                    -
                                  </button>
                                  <span>{el.count}</span>
                                  <button
                                    className="count"
                                    onClick={() =>
                                      dispatch(PlusFn({ id: el.id }))
                                    }
                                  >
                                    +
                                  </button>
                                </li>
                              </div>
                              <button
                                className="cart-delete"
                                onClick={() => {
                                  if (window.confirm("삭제하시겠습니까?")) {
                                    dispatch(DeleteFn({ id: el.id }));
                                  } else {
                                    console.log("삭제 취소");
                                  }
                                }}
                              >
                                <img src="/images/x.png" alt="xButton" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </ul>
                </div>
                <div className="cartIndex-right-final">
                  <div className="cart-right-receive">
                    <div className="cart-receive-method">
                      <span>수령방법</span>
                      <div className="receive-method-con">
                        <div className="receive-parcel">
                          <input
                            type="radio"
                            name="receive"
                            id="receive"
                            checked={receive === "deliveryOK"}
                            onChange={() => {
                              dispatch(receiveMethod("deliveryOK"));
                            }}
                          />
                          택배
                        </div>
                        <div className="receive-visit">
                          <input
                            type="radio"
                            name="receive"
                            id="receive"
                            checked={receive === "visit"}
                            onChange={() => {
                              dispatch(receiveMethod("visit"));
                            }}
                          />
                          매장방문
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="cartIndex-right">
                    <div className="cartPaynemt-title">결제금액</div>
                    {cart &&
                      cart.forEach((el) => {
                        if (el.isChecked === true) {
                          totalAmount += el.count * el.price;
                        } else {
                          totalAmount += 0;
                        }
                      })}
                    <div className="cartPayment-detail">
                      <div className="cartPayment-price">
                        <span>상품금액</span>
                        <span>{totalAmount.toLocaleString()}원</span>
                      </div>
                      <div className="cartPayment-parcel">
                        <span>배송비</span>
                        <span>{parcelMoney.toLocaleString()}원</span>
                      </div>
                    </div>
                    <div className="cartPayment-total">
                      <span>결제예상금액</span>
                      <span>
                        {(totalAmount + parcelMoney).toLocaleString()}원
                      </span>
                    </div>
                    <button
                      className="payment-button"
                      onClick={() => {
                        if (islogin === true) {
                          if (checkItem.length <= 0) {
                            alert("1개 이상의 상품을 선택해주세요.");
                          } else {
                            navigate("/payment");
                          }
                        } else {
                          alert("로그인 페이지로 이동합니다.");
                          navigate("/auth");
                        }
                      }}
                    >
                      주문하기
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartIndex;
