import React, { useEffect } from 'react'
import { apiSearchKakaoFn } from '../../../apis/shopPos'

const AdminLocationMapModal = ({ setIsMapModal, tShop}) => {
  useEffect(()=>{
    apiSearchKakaoFn(tShop)
  }, [])

  return (
    <div className="admin-modal">
      <div className="admin-modal-con">
      <span className="close" onClick={() => { setIsMapModal(false) }}>X</span>
      <h1>{tShop}의 위치</h1>
      <div className="admin-modal-container">

        <div id="map"></div>
      </div>
      </div>
    </div>
  )
}

export default AdminLocationMapModal