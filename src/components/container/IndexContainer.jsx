import React from "react";
import { Link } from "react-router-dom";

const IndexContainer = () => {
  return (
    <div className="index-container">
      <div className="index-container-con">
        <h1>LUXIP</h1>
        <span>Luxip는 Luxury와 Sip의 조합으로,</span>
        <span>단순한 음료 이상의 가치를 전합니다.</span>
        <span>
          와인, 위스키, 보드카 등 세련된 취향을 위한 고급 주류를 한자리에.
        </span>
        <span>한 잔의 여유와 품격을 담은 경험을 지금 만나보세요.</span>
        <div className="link">
          <Link to={"/order/main"}>shop now</Link>
        </div>
      </div>
    </div>
  );
};

export default IndexContainer;
