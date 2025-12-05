import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUserFn } from "../../slice/authSlice";

const Header = () => {
  const islogin = useSelector((state) => state.auth.islogin);
  const loginUser = useSelector((state) => state.auth.loginUser);
  const cartItem = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();
  const navigator = useNavigate();

  const ulRef = useRef(null);

  const ulOnclickFn = (e) => {
    const cTarget = e.currentTarget;
    const target = e.target;

    Array.prototype.forEach.call(cTarget.children, (el) => {
      if (el === target.parentElement) {
        if (el.getAttribute("class") !== "log")
          el.children[0].classList.add("c-ul");
        console.log(target);
      } else {
        el.children[0].classList.remove("c-ul");
      }
    });
  };

  return (
    <div className="header">
      <div className="header-con">
        <div className="nav">
          <h1 className="title">
            {/* <Link to={"/main"}>LUXIP</Link> */}
            <Link to={"/order/main"}>LUXIP</Link>
          </h1>
          <ul>
            {islogin ? (
              <>
                <li>
                  <Link to={`/payment/detail/${loginUser[0].id}`}>
                    <img src="/images/users.png" alt="users" />
                  </Link>
                </li>
                <li className="cart">
                  <Link to={"/cart"}>
                    <img src="/images/cart.png" alt="cart" />
                  </Link>
                  {cartItem && cartItem.length > 0 ? (
                    <span>{cartItem.length}</span>
                  ) : null}
                </li>
                {loginUser && loginUser[0].role === "ROLE_ADMIN" ? (
                  <li>
                    <Link to={"/admin"}>관리자페이지</Link>
                  </li>
                ) : (
                  <></>
                )}
                <li>
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      if (window.confirm("로그아웃")) {
                        dispatch(logoutUserFn());
                        navigator("/");
                      } else {
                        console.log("로그아웃취소");
                      }
                    }}
                    >
                    로그아웃
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={"/auth/login"}>로그인</Link>
                </li>
                <li>
                  <Link to={"/auth/join"}>회원가입</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="gnb">
          <ul ref={ulRef} onClick={ulOnclickFn}>
            {/* <li>
              <Link to={"/main"} className="c-ul">Main</Link>
            </li> */}
            <li>
              <Link to={"/order/main"} className="c-ul">
                Main
              </Link>
            </li>
            <li>
              <Link to={"/order/best"}>BestSellers</Link>
            </li>
            <li>
              <Link to={"/order/wine"}>Wine</Link>
            </li>
            <li>
              <Link to={"/order/whiskey"}>Whiskey</Link>
            </li>
            <li>
              <Link to={"/order/vodka"}>Vodka</Link>
            </li>
            <li>
              <Link to={"/order/accessories"}>Accessories</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
