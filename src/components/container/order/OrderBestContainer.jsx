import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addCart } from "../../../slice/cartSlice";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
const itemUrl = "http://192.168.23.231:3001/items";

const OrderBestContainer = () => {
  const goCart = () => {
    navigate("/cart");
  };
  // const [bestOrders, setbestOrders] = useState([])

  const [isBest, setIsBest] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectItem, setSelectItem] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const plQty = () => setQuantity((num) => num + 1);
  const miQty = () => setQuantity((num) => (num > 1 ? num - 1 : 1));

  const totalPrice = selectItem ? selectItem.price * quantity : 0;

  const cart = useSelector((state) => state.cart.items);

  useEffect(() => {
    const bestItemFn = async () => {
      const res = await axios.get(itemUrl); // respond 는 axios로 itemUrl을 가져올때까지 기다렸다가 적용
      // console.log(res.data)
      //  res.data.forEach(el=>{
      //   if( el.isBest===true){

      //     console.log(el)
      //     // setIsBest()
      //   }

      const data1 = res.data.filter((el) => {
        if (el.isBest === true) {
          // console.log(el)
          return el; // setIsBest()
        }
        // return   el.isBest===true ? el:<></>
      });

      console.log(data1);
      // setIsBest([...isBest,data1])
      setIsBest(data1);
    };
    bestItemFn();
  }, []);

  const totalPages = Math.ceil(isBest.length / itemsPerPage);

  const currentItems = isBest.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const navigate = useNavigate();

  const openModal = (item) => {
    setSelectItem(item);
    setModalIsOpen(true);
    setQuantity(1);
  };

  const closeModal = () => {
    setSelectItem(null);
    setModalIsOpen(false);
  };

  const dispatch = useDispatch();

  return (
    <>
      <div className="best">
        <div className="best-con">
          {currentItems.map((el) => (
            <div className="best-item" key={el.id}>
              <div
                className="item-top"
                onClick={() => navigate(`/order/itemdetail/${el.id}`)}
                style={{ cursor: "pointer" }}
              >
                <img src={el.img} alt={el.name} />
              </div>
              <div className="cart-middle">
                <button
                  className="cart-button"
                  onClick={() => openModal(el)}
                  style={{ cursor: "pointer" }}
                >
                  <img src="/images/cart.png" alt="cart" />
                  담기
                </button>
              </div>
              <div
                className="item-bottom"
                onClick={() => navigate(`/order/itemdetail/${el.id}`)}
                style={{ cursor: "pointer" }}
              >
                <h3>{el.name}</h3>
                <p>{el.price.toLocaleString()}원</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "30px", textAlign: "center" }}></div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          overlayClassName="modal-overlay"
          className="modal-content"
          // contentLabel="상품 상세 정보"
        >
          {selectItem && (
            <div>
              <button className="closeBtn" onClick={closeModal}>
                X
              </button>
              <div className="box-img">
                <img src={selectItem.img} alt={selectItem.name} />
              </div>
              <h2>
                {selectItem.name} : {selectItem.price}원
              </h2>

              <div className="cart">
                <div className="quantity-box">
                  <button className="mi-btn" onClick={miQty}>
                    -
                  </button>
                  <span className="qty"> {quantity} </span>
                  <button className="pl-btn" onClick={plQty}>
                    +
                  </button>
                </div>
                <span className="total-price">{totalPrice}원</span>
                <button
                  className="cart-go"
                  onClick={() => {
                    dispatch(
                      addCart({
                        ...selectItem,
                        count: quantity,
                        isChecked: false,
                      })
                    );
                    if (
                      window.confirm("담기 완료! 장바구니로 이동하시겠습니까?")
                    ) {
                      navigate("/cart");
                    } else {
                      console.log("장바구니 이동 취소");
                    }
                  }}
                >
                  장바구니
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
      {/* <div>
    {isBest.length}
    {isBest.map(el=>{
      return(
        <div key={el.id}></div>
      )
    })}
  </div> */}
    </>
  );
};

export default OrderBestContainer;
