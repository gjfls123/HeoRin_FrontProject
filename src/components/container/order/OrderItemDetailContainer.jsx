import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../../../slice/cartSlice";
import { paymentDirect } from "../../../slice/paymentSlice";
import CommentSection from "../../common/CommentSection";
import ContactSection from "../../common/ContactSection";

const OrderItemDetailContainer = () => {
  // bestItem, counter, 총금액  state
  const [bestItem, setBestItem] = useState({});
  const [counter, setCounter] = useState(1);
  // const [totalAmount, setTotalAmount] = useState(counter * bestItem.price);

  const isLoggedIn = useSelector((state) => state.auth.islogin);
  const userName = useSelector((state) => state.auth.loginUser[0]?.userName);

  const descriptionRef = useRef(null);
  const detailRef = useRef(null);
  const reviewRef = useRef(null);
  const contactRef = useRef(null);

  const param = useParams();
  const [userId, setUserId] = useState(param.id);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // const ClickView = async (id) => {
  //   try{
  //     const res = await axios.get(`http://192.168.23.231:3001/items/${id}`)
  //   }
  // }
  const detailUrl = `http://192.168.23.231:3001/items/${userId}`;
  useEffect(() => {
    const itemDetailFn = async () => {
      try {
        const res = await axios.get(detailUrl);
        const itemData = res.data;
        const updatedviews = itemData.views + 1;
        await axios.patch(detailUrl, { views: updatedviews });
        if (res.status !== 200) {
          alert("status 오류!");
        }
        setBestItem({ ...itemData, views: updatedviews });
      } catch (err) {
        alert(err);
      }
    };
    itemDetailFn();
  }, []);

  return (
    <div className="itemDetail">
      <div className="itemDetail-con">
        <div className="itemDetail-left">
          <img src={`${bestItem.img}`} alt="bestItemImg" />
        </div>
        <div className="itemDetail-right">
          <div className="right-con">
            <ul>
              <li>{bestItem.name}</li>
              <li>{new Intl.NumberFormat().format(bestItem.price)}원</li>
            </ul>
          </div>
          <div className="right-inform">
            <ul>
              <li>원산지: {bestItem.from}</li>
              <li>도수: {bestItem.alc}</li>
              <li>개봉후 소비기한: {bestItem.till}</li>
              <li>설명: {bestItem.information}</li>
              <li>조회수: {bestItem.views}</li>
            </ul>
          </div>
          <div className="right-couter">
            <button
              className="Minus"
              onClick={() => {
                counter <= 1 ? setCounter(1) : setCounter(counter - 1);
              }}
            >
              -
            </button>
            <span>{counter}</span>
            <button
              className="Plus"
              onClick={() => {
                setCounter(counter + 1);
              }}
            >
              +
            </button>
          </div>
          <div className="total-amount">
            <span className="all">총 상품금액:</span>
            <span className="price">
              {new Intl.NumberFormat().format(bestItem.price * counter)}
            </span>
            <span className="won">원</span>
          </div>
          <div className="right-cartButton">
            <button
              className="cart"
              onClick={() => {
                dispatch(
                  addCart({
                    ...bestItem,
                    count: counter,
                    isChecked: false,
                  })
                );
                if (window.confirm("담기 완료! 장바구니로 이동하시겠습니까?")) {
                  navigate("/cart");
                } else {
                  console.log("장바구니 이동 취소");
                }
              }}
            >
              장바구니 담기
            </button>
            <button
              className="payment"
              onClick={() => {
                if (isLoggedIn === true) {
                  dispatch(
                    paymentDirect({
                      ...bestItem,
                      count: counter,
                    })
                  );
                  navigate("/payment");
                } else {
                  alert("로그인 페이지로 이동합니다.");
                  navigate("/auth");
                }
              }}
            >
              바로결제
            </button>
          </div>
        </div>
      </div>
      <div className="nav">
        <div className="explain">
          <ul>
            <li className="product-explain">
              <Link
                className="ex"
                onClick={(e) => {
                  e.preventDefault();
                  descriptionRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                  // 이동
                }}
              >
                <span className="name">상품설명</span>
              </Link>
            </li>
            <li className="product-detail">
              <Link
                className="detail"
                onClick={(e) => {
                  e.preventDefault();
                  detailRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                  // 이동
                }}
              >
                <span className="name">상세정보</span>
              </Link>
            </li>
            <li className="product-review">
              <Link
                className="review"
                onClick={(e) => {
                  e.preventDefault();
                  reviewRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                  // 이동
                }}
              >
                <span className="name">리뷰/후기</span>
              </Link>
            </li>
            <li className="product-contact">
              <Link
                className="contact"
                onClick={(e) => {
                  e.preventDefault();
                  contactRef.current?.scrollIntoView({ behavior: "smooth" });
                  // 이동
                }}
              >
                <span className="name">문의</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="detail">
        <div ref={descriptionRef} className="scroll-target">
          <div className="description">
            <img src={`${bestItem.img}`} alt="bestItemImg" />
            <p>{bestItem.information}</p>
          </div>
        </div>
        <div ref={detailRef} className="scroll-target">
          <div className="detail">
            <img src={bestItem.Detail} alt="bestItemDetail" />
          </div>
        </div>
        <div ref={reviewRef} className="scroll-target">
          <CommentSection
            itemId={userId}
            isLoggedIn={isLoggedIn}
            userName={userName}
          />
        </div>
        <div ref={contactRef} className="scroll-target">
          <ContactSection
            itemId={userId}
            isLoggedIn={isLoggedIn}
            userName={userName}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderItemDetailContainer;
