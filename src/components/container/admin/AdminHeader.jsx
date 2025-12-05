import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { logoutUserFn } from '../../../slice/authSlice';


const AdminHeader = () => {
  const islogin = useSelector((state) => state.auth.islogin);
  const loginUser = useSelector((state) => state.auth.loginUser);

  // console.log("islogin 상태:", islogin);
  // console.log("로그인 유저 확인:", loginUser);
  // console.log("loginUser[0]:", loginUser[0]);
  // console.log("유저 이름 확인:", loginUser[0]?.userName);

  const dispatch = useDispatch();
  const navigator = useNavigate();


  return (
    <div className="admin-header">
      <div className="admin-header-con">
        <ul>
          <li>
            <h2>관리자 {loginUser[0]?.userName} 님</h2>
          </li>
          <li>
            {islogin ? (
              <>
              <h4>
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
              </h4>
              </>
                ) : null}
          </li>          
        </ul>
      </div>
    </div>
  )
}

export default AdminHeader