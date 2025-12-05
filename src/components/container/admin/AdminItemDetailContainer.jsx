import React, { useEffect, useState } from "react";
import { DB_SERVER_URL } from "../../../apis/commonApis";
import axios from "axios";
import Dashboard from "./Dashboard";
const AdminItemDetailContainer = () => {
  const [data, setData] = useState([]);       // 주문 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null);     // 에러 상태

  useEffect(() => {
    // async 함수 선언 (비동기 요청용)
    const fetchAxiosData = async () => {
      try {
        // axios.get으로 데이터 요청, await로 완료 대기
        const res = await axios.get(`${DB_SERVER_URL}/payment`);

        setData(res.data);      // 데이터 상태 저장
        setLoading(false);           // 로딩 끝내기
      } catch (err) {
        setError(err);               // 에러 상태 저장
        setLoading(false);           // 로딩 끝내기
      }
    };

    fetchAxiosData(); // 위 async 함수 호출
  }, []); // 빈 배열: 컴포넌트 마운트 시 1회 실행

  if (loading) return <div>데이터 로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <div className="dash-board">
      <Dashboard data={data} />
    </div>
  );
};


export default AdminItemDetailContainer;
