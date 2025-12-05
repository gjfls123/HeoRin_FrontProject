import React, { useEffect, useState } from "react";
import { apiSearchKakaoFn } from "../../../apis/shopPos";
import { DB_SERVER_URL } from "../../../apis/commonApis";
import axios from "axios";

const PaymentMapModal = ({ setIsOpen, tShop }) => {
  useEffect(() => {
    apiSearchKakaoFn(tShop);
  }, []);

  return (
    <div className="paymentMap">
      <div className="paymentMap-con">
        <div className="paymentMap-title">
          <span>{tShop}</span>
        </div>
        <button
          onClick={() => {
            setIsOpen(false);
          }}
        >
          닫기
        </button>
        <div id="map"></div>
      </div>
    </div>
  );
};

export default PaymentMapModal;
