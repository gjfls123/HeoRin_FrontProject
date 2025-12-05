// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Modal from "react-modal";

// const itemUrl = "http://192.168.23.231:3001/items";

// const OrderWineContainer = () => {
//   const goCart = () => {
//     navigate("/cart");
//   };
//   const [WineItem, setWineItem] = useState([]);

//   const [modalIsOpen, setModalIsOpen] = useState(false);

//   const [selectItem, setSelectItem] = useState(null);

//   const [quantity, setQuantity] = useState(1);

//   const plQty = () => setQuantity((num) => num + 1);
//   const miQty = () => setQuantity((num) => (num > 1 ? num - 1 : 1));

//   const totalPrice = selectItem ? selectItem.price * quantity : 0;

//   useEffect(() => {
//     const wineItemFn = async () => {
//       try {
//         const res = await axios.get(itemUrl);
//         // console.log(res.data);
//         const WineData = res.data.filter((item) => item.categories === "Wine");
//         setWineItem(WineData);
//       } catch (err) {
//         alert(err);
//       }
//     };

//     wineItemFn();
//   }, []);

//   const navigate = useNavigate();

//   const openModal = (item) => {
//     setSelectItem(item);
//     setModalIsOpen(true);
//   };

//   const closeModal = () => {
//     setSelectItem(null);
//     setModalIsOpen(false);
//   };

//   return (
//     <>
//       <div className="WinePage">
//         <div className="WinePage-con">
//           {WineItem.map((el) => {
//             return (
//               <div className="Wine-item">
//                 <div
//                   className="item-top"
//                   key={el.id}
//                   onClick={() => navigate(`/order/itemdetail/${el.id}`)}
//                   style={{ cursor: "pointer" }}
//                 >
//                   <img src={el.img} alt={el.name} />
//                 </div>
//                 <div className="cart-middle">
//                   <button
//                     className="cart-button"
//                     onClick={() => openModal(el)}
//                     style={{ cursor: "pointer" }}
//                   >
//                     <img src="/images/cart.png" alt="cart" />
//                     담기
//                   </button>
//                 </div>
//                 <div
//                   className="item-bottom"
//                   key={el.id}
//                   onClick={() => navigate(`/order/itemdetail/${el.id}`)}
//                   style={{ cursor: "pointer" }}
//                 >
//                   <h3>{el.name}</h3>
//                   <p>{el.price.toLocaleString()}원</p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//         <Modal
//           isOpen={modalIsOpen}
//           onRequestClose={closeModal}
//           overlayClassName="modal-overlay"
//           className="modal-content"
//           // contentLabel="상품 상세 정보"
//         >
//           {selectItem && (
//             <div>
//               <button className="closeBtn" onClick={closeModal}>
//                 X
//               </button>
//               <div className="box-img">
//                 <img src={selectItem.img} alt={selectItem.name} />
//               </div>
//               <h2>
//                 {selectItem.name} : {selectItem.price}원
//               </h2>

//               <div className="cart">
//                 <div className="quantity-box">
//                   <button className="mi-btn" onClick={miQty}>
//                     -
//                   </button>
//                   <span className="qty"> {quantity} </span>
//                   <button className="pl-btn" onClick={plQty}>
//                     +
//                   </button>
//                 </div>
//                 <span className="total-price">{totalPrice}원</span>
//                 <button className="cart-go" onClick={goCart}>
//                   장바구니
//                 </button>
//               </div>
//             </div>
//           )}
//         </Modal>
//       </div>
//     </>
//   );
// };

// export default OrderWineContainer;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCart } from "../../../slice/cartSlice";
import { useDispatch } from "react-redux";
import Modal from "react-modal";

const itemUrl = "http://192.168.23.231:3001/items";

const OrderWineContainer = () => {
  const navigate = useNavigate();

  const [WineItem, setWineItem] = useState([]); // 전체 와인 데이터
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
  const itemsPerPage = 8; // 한 페이지당 아이템 수

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectItem, setSelectItem] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const plQty = () => setQuantity((num) => num + 1);
  const miQty = () => setQuantity((num) => (num > 1 ? num - 1 : 1));

  const goCart = () => {
    navigate("/cart");
  };

  const totalPrice = selectItem ? selectItem.price * quantity : 0;

  useEffect(() => {
    const wineItemFn = async () => {
      try {
        const res = await axios.get(itemUrl);
        const WineData = res.data.filter((item) => item.categories === "Wine");
        setWineItem(WineData);
      } catch (err) {
        alert("데이터 로딩 오류: " + err);
      }
    };
    wineItemFn();
  }, []);

  // 🔸 전체 페이지 수 계산
  const totalPages = Math.ceil(WineItem.length / itemsPerPage);

  // 🔸 현재 페이지의 아이템만 추출
  const currentItems = WineItem.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // 🔸 모달 열기
  const openModal = (item) => {
    setSelectItem(item);
    setQuantity(1); // 수량 초기화
    setModalIsOpen(true);
  };

  // 🔸 모달 닫기
  const closeModal = () => {
    setSelectItem(null);
    setModalIsOpen(false);
  };

  const dispatch = useDispatch();

  return (
    <div className="WinePage">
      <div className="Wine-header">
        <img src="/images/liquor/Wine/Wine Barrel.jpg" alt="Wine-Barrel" />
      </div>
      <div className="WinePage-con">
        {currentItems.map((el) => (
          <div className="Wine-item" key={el.id}>
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

      {/* 🔸 페이징 버튼 */}
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={`page-${i}`}
            onClick={() => setCurrentPage(i)}
            style={{
              margin: "0 5px",
              backgroundColor:
                currentPage === i ? "rgb(229, 229, 229)" : "#eee",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* 🔸 모달 */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="modal-overlay"
        className="modal-content"
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
              {selectItem.name} : {selectItem.price.toLocaleString()}원
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
              <span className="total-price">
                {totalPrice.toLocaleString()}원
              </span>
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
  );
};

export default OrderWineContainer;
