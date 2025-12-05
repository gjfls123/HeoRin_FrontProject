import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { DB_SERVER_URL } from '../../../apis/commonApis'
import { useNavigate } from 'react-router'

const AdminLoctionModal = ({ elId, setIsModal, fetchLocationList }) => {

  const [location, setLocation] = useState({})
  const dataURL = `${DB_SERVER_URL}/order`
  const navigate = useNavigate()


  useEffect(() => {

    const onLocationGetFn = async (locationId) => {
      try {
        const res = await axios.get(`${dataURL}?id=${locationId}`)  // 조회
        // console.log(res + " res")
        // console.log(res.data)
        // console.log(res.data[0])
        setLocation(res.data[0])
      } catch (err) {
        alert(err)
      }
    }
    onLocationGetFn(elId)
  }, [elId])  // id가 변할 때마다

  const onChangeUpdateFn = (e) => {
    const name = e.target.name
    const value = e.target.value
    console.log(name + " , " + value)
    // setUpdate({ ...update, [name]: value })
    setLocation({ ...location, [name]: value })
  }

  const updateOkFn = async () => {
    const updateAxiosFn = async (updatData) => {
      try {

        const res1 = await axios.get(`${dataURL}`)  // 조회
        const num = res1.data.findIndex(el => {
          return el.id === location.id
        })
        if (num === -1) {
          alert('주문처 미존재')
          return
        }
        //=============================
        alert('주문처수정실행!')
        const res = await axios.put(`${dataURL}/${updatData.id}`, updatData)
        console.log(res + ' <<< 상품 수정 res')
        fetchLocationList()

      } catch (err) {
      }
    }
    updateAxiosFn(location)
  }

  const deleteOkFn = (e) => {

    const deleteAxiosFn = async (locationId) => {
      try {

        const res1 = await axios.get(`${dataURL}`)  // 조회
        const num = res1.data.findIndex(el => {
          return el.id === location.id
        })
        if (num === -1) {
          alert('주문처가 존재하지 않습니다! 주문처등록 먼저해주세요~')
          return
        }
        if(window.confirm("주문처삭제실행")){
          const res = await axios.delete(`${dataURL}/${locationId}`)
          console.log(res + ' <<< 주문처 삭제 res')
          fetchLocationList()
        }else {
          alert('주문처삭제취소')
        }  
      } catch (err) {
      }
    }
    deleteAxiosFn(location.id)
  }

  return (
    <div className="admin-modal">
      <div className="admin-modal-con">
      <span className="close" onClick={() => { setIsModal(false) }}>X</span>
      <h1>{location.name}의 상세정보</h1>
      <div className="admin-modal-container">

        <ul>
          <li>
            <label htmlFor="name">이름</label>
            <input type="text" name="name" id="name" placeholder='NAME'
              value={location.name || ''}
              onChange={onChangeUpdateFn} />
          </li>
          <li>
            <label htmlFor="number">전화번호</label>
            <input type="text" name="number" id="number" placeholder='NUMBER'
              value={location.number || ''}
              onChange={onChangeUpdateFn} />
          </li>
          <li>
            <label htmlFor="x">X좌표</label>
            <input type="text" name="x" id="x" placeholder='X'
              value={location.x || ''}
              onChange={onChangeUpdateFn} />
          </li>
          <li>
            <label htmlFor="y">Y좌표</label>
            <input type="text" name="y" id="y" placeholder='Y'
              value={location.y || ''}
              onChange={onChangeUpdateFn} />
          </li>
          <li>
            <label htmlFor="img">이미지</label>
            <input type="text" name="img" id="img" placeholder='IMG'
              value={location.img || ''}
              onChange={onChangeUpdateFn} />
          </li>
          <li>
            <label htmlFor="imgchange">이미지변경</label>
            <input type='file' name="imgchange" id="imgchange" accept='image/*'
              onChange={(e)=> {
                const file = e.target.files[0];
                if (file) {
                  const imageUrl =  URL.createObjectURL(file)
                  setLocation({...location, img:imageUrl})
                }
              }}
              style={{width: '100%'}}             
              />
          </li>
          <li>
            <button onClick={updateOkFn} >주문처수정</button>
            <button onClick={deleteOkFn}>주문처삭제</button>
            <button onClick={() => navigate('/admin')}>HOME</button>
          </li>
        </ul>
              </div>
      </div>
    </div>
  )
}

export default AdminLoctionModal