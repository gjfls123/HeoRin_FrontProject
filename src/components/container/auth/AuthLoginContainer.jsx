import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { loginUserFn, addUser } from "../../../slice/authSlice";
import { DB_SERVER_URL } from "../../../apis/commonApis";

const logindata = {
  userEmail: "",
  userPw: "",
};

const AuthLoginContainer = () => {
  const navigate = useNavigate();

  const [login, setlogin] = useState(logindata);
  const isUser = useSelector((state) => state.auth.isUser);

  const islogin = useSelector((state) => state.auth.islogin);
  console.log(islogin + " islogin ");
  const dispatch = useDispatch();
  const [user, setUser] = useState();

  const onLoginChangeFn = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(`name -> ${name}, value -> ${value}`);
    setlogin({ ...login, [name]: value });
  };

  const onLoginFn = (e) => {
    const dataURL = `${DB_SERVER_URL}/members`;
    const loginAxiosFn = async () => {
      try {
        alert("로그인 실행!");
        const res = await axios.get(`${dataURL}`);
        console.log(res.data);
        const num = res.data.findIndex((el) => {
          return el.userEmail === login.userEmail && el.userPw === login.userPw;
        });

        if (num === -1) {
          alert("로그인 실패!!");
          return;
        }

        const member = res.data.filter((el) => {
          return el.userEmail === login.userEmail && el.userPw === login.userPw;
        });
        if (member != null) {
          alert("로그인 성공!!");
          // authSlice에 로그인 정보 저장(공유)
          dispatch(loginUserFn(member[0]));
          console.log(islogin + " <<");
          navigate("/main");

          // user 저장
        }
      } catch (error) {
        alert(error);
      }
    };
    loginAxiosFn();
  };

  return (
    <>
      <div className="auth-login">
        <div className="auth-login-con">
          {/* 로그인: {islogin} */}
          {/* {islogin && user && ( */}
          {/* <div>
          <ul>
            <li>권한: {user.role}</li>
            <li>아이디: {user.id}</li>
            <li><Link to = {`/auth/detail/${user.id}`}>보기</Link></li>
            <li>이름: {user.name}</li>
            <li>이메일: {user.Email}</li>
          </ul>
        </div> */}
          {/* )} */}
          <h1>로그인</h1>
          <ul>
            <li>
              <input
                type="email"
                name="userEmail"
                id="userEmail"
                placeholder="이메일을 입력해주세요"
                value={login.userEmail}
                onChange={onLoginChangeFn}
              />
            </li>
            <li>
              <input
                type="password"
                name="userPw"
                id="userPw"
                placeholder="비밀번호를 입력해주세요"
                value={login.userPw}
                onChange={onLoginChangeFn}
              />
            </li>
            <li>
              <div className="login-button">
                <button onClick={onLoginFn}>로그인</button>
              </div>
              <div className="join-button">
                <button
                  onClick={() => {
                    navigate("/auth/join");
                  }}
                >
                  회원가입
                </button>
              </div>
              {/* <button
                onClick={() => {
                  navigate("/main");
                }}
              >
                Home
              </button> */}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AuthLoginContainer;
