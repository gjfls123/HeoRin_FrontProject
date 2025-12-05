import React, { useRef } from "react";
import { Link } from "react-router-dom";

const AdminLeft = () => {
  const ulRef = useRef(null);

  const ulOnclickFn = (e) => {
    const cTarget = e.currentTarget
    const target = e.target
    

    Array.prototype.forEach.call(cTarget.children, (el)=> {
      if (el === target.parentElement){
        if(el.getAttribute('class') !== 'log') el.children[0].classList.add('c-ul')
      } else{
        el.children[0].classList.remove('c-ul')
      }
    })
  }
  return (
    <div className="left">
      <div className="left-con">
        <ul ref={ulRef} onClick={ulOnclickFn}>
          <li>
            <Link to={"/"}>
            <img src="/images/logo.png" alt="logo" />
            </Link>
          </li>
          <li>
            <Link to={"/admin/memberlist"} className="c-ul">회원관리</Link>
            <img src="/images/admin/members.png" alt="members" />
          </li>
          <li>
            <Link to={"/admin/itemlist"}>상품관리</Link>
            <img src="/images/admin/product.png" alt="product" />
          </li>
          <li>
            <Link to={"/admin/orderpayment"}>주문관리</Link>
            <img src="/images/admin/order.png" alt="order" />
          </li>
          <li>
            <Link to={"/admin/orderlocation"}>지점관리</Link>
            <img src="/images/admin/wtorder.png" alt="wtorder" />
          </li>
          <li>
            <Link to={"/admin/itemdetail"}>판매현황</Link>
            <img src="/images/admin/graph.png" alt="find" />
          </li>
          <li>
            {/* <Link to={"/main"}>H O M E</Link> */}
            <Link to={"/order/main"}>H O M E</Link>
            <img src="/images/admin/home.png" alt="home" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminLeft;
