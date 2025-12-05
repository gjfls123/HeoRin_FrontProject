import React, { useState } from "react";
import { useNavigate, navigate } from "react-router-dom";
import axios from "axios";
import { DB_SERVER_URL } from "../../../apis/commonApis";

const joinData = {
  userEmail: "",
  userPw: "",
  userName: "",
  age: "",
  address: "",
  role: "ROLE_MEMBER",
};

const AuthJoinContainer = () => {
  const [join, setJoin] = useState(joinData);
  console.log(join);

  const navigate = useNavigate();

  const onInputChangeFn = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);

    setJoin({ ...join, [name]: value });
  };

  const onJoinFn = (e) => {
    const dataURL = `${DB_SERVER_URL}/members`;
    const joinAxiosFn = async () => {
      try {
        alert("회원가입실행");
        const res = await axios.get(`${dataURL}`);
        if (res === null) {
          alert("Fail");
          return;
        }
        console.log(res.data);
        const num = res.data.findIndex((el) => {
          return el.userEmail === join.userEmail;
        });
        if (num !== -1) {
          alert("중복 이메일이 있습니다! 다시 등록해주세요~");
          return;
        }

        const joinOk = await axios.post(`${dataURL}`, join);
        alert("회원가입 성공");
        navigate(`/auth/login`);
      } catch (err) {
        alert("회원가입 실패 ->" + err);
      }
    };
    joinAxiosFn();
  };
  return (
    <>
      <div className="auth-join">
        <div className="auth-join-con">
          <h1>회원가입</h1>
          <ul>
            <li>
              <div className="email-con">
                <span className="email">이메일</span>
                <input
                  type="Email"
                  name="userEmail"
                  id="userEmail"
                  placeholder="사용하실 이메일을 입력해주세요"
                  value={join.userEmail}
                  onChange={onInputChangeFn}
                />
              </div>
              <div className="password-con">
                <span className="password">비밀번호</span>
                <input
                  type="password"
                  name="userPw"
                  id="userPw"
                  placeholder="사용하실 비밀번호를 입력해주세요"
                  value={join.userPw}
                  onChange={onInputChangeFn}
                />
              </div>
              {/* <div className="passwordcheck-con">
                <span className="passwordcheck">비밀번호 확인</span>
                <input
                  type="password"
                  name="userPwCheck"
                  id="userPwCheck"
                  placeholder="비밀번호를 한번 더 입력해주세요"
                  value={join.userPw}
                  onChange={onInputChangeFn}
                />
              </div> */}
              <div className="name-con">
                <span className="name">성함</span>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  placeholder="성함"
                  value={join.userName}
                  onChange={onInputChangeFn}
                />
              </div>
              <div className="age-con">
                <span className="age">나이</span>
                <input
                  type="text"
                  name="age"
                  id="age"
                  placeholder="나이"
                  value={join.age}
                  onChange={onInputChangeFn}
                />
              </div>
              <div className="address">
                <span className="address">주소</span>
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="주소"
                  value={join.address}
                  onChange={onInputChangeFn}
                />
              </div>
            </li>
            <li>
              <label htmlFor="role">ROLE</label>
              <select
                name="role"
                id="role"
                value={join.role}
                onChange={onInputChangeFn}
              >
                <option value="ROLE_MEMBER" defaultValue>
                  MEMBER
                </option>
                <option value="ROLE_ADMIN">ADMIN</option>
              </select>
            </li>
            <div className="JoinBottom_Btn">
              <div className="join-box">
                <button onClick={onJoinFn}>가입하기</button>
              </div>
              <div className="login-box">
                <button
                  onClick={() => {
                    navigate("/auth/login");
                  }}
                >
                  로그인
                </button>
              </div>
              {/* <button
                onClick={() => {
                  navigate("/main");
                }}
              >
                Home
              </button> */}
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AuthJoinContainer;
