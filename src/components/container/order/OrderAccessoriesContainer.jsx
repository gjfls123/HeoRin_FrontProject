import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
const itemUrl = "http://192.168.23.231:3001/items";

const OrderAccessoriesContainer = () => {
  const goCart = () => {
    navigate("/cart");
  };
  // console.log("gd")

  const [AccessoriesItem, setAccessoriesItem] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [selectItem, setSelectItem] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const plQty = () => setQuantity((num) => num + 1);
  const miQty = () => setQuantity((num) => (num > 1 ? num - 1 : 1));

  const totalPrice = selectItem ? selectItem.price * quantity : 0;

  useEffect(() => {
    const AccessoriesItemFn = async () => {
      try {
        const res = await axios.get(itemUrl);
        // console.log(res.data);
        const AccessoriesData = res.data.filter(
          (item) => item.categories === "Accessories"
        );
        setAccessoriesItem(AccessoriesData);
      } catch (err) {
        alert(err);
      }
    };

    AccessoriesItemFn();
  }, []);

  const navigate = useNavigate();

  const openModal = (item) => {
    setSelectItem(item);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectItem(null);
    setModalIsOpen(false);
  };

  return (
    <>
      <div className="AccessoriesPage">
        <div className="Accessory-header">
          <img src="/images/Accessories/AccessoryPic.jpg" alt="Accessory" />
        </div>
        <div className="AccessoriesPage-con">
          {AccessoriesItem.map((el) => (
            <div className="Accessory-item" key={el.id}>
              <div
                className="item-top"
                onClick={() => navigate(`/order/itemdetail/${el.id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="img-box">
                  <img src={el.img} alt={el.name} />
                </div>
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
                <button className="cart-go" onClick={goCart}>
                  장바구니
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
};

export default OrderAccessoriesContainer;
