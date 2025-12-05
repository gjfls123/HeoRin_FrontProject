import React, { useState } from 'react'
import { DB_SERVER_URL } from '../../../apis/commonApis'
import axios from 'axios'
const addLocData = {
  name:'',
  number:'',
  x:'',
  y:'',
  img:''
}
const AdminAddLoctionModal = ({setIsAddModal, fetchLocationList}) => {

    const [add, setAdd] = useState(addLocData)

    const onAddLocationFn = (e) =>{
      const name = e.target.name
      const value = e.target.value
      console.log(name, value)
  
      setAdd({...add, [name]: value})
    }

    const onAddFn = (e) =>{

      const dataURL = `${DB_SERVER_URL}/order`
      const addAxiosFn = async() => {
        try {
          alert('주문처등록실행')
          const res = await axios.get(`${dataURL}`)
          if(res === null){
            alert('실패')
            return
          } 
          console.log(res.data);
          const num = res.data.findIndex(el => {
            return el.name === add.name
          })
          if (num !== -1) {
            alert('중복 상품이 있습니다')
            return 
          }
          const addOk = await axios.post(`${dataURL}`,add)
          alert('상품등록 성공')
          fetchLocationList()
        }catch (error) {
          alert(error)
        }
      }
      addAxiosFn()
    }


  return (
    <div className="admin-modal">
      <div className="admin-modal-con">
        <span className="close" onClick={() => { setIsAddModal(false) }}>X</span>
        <h1>주문처등록</h1>
        <div className="admin-modal-container">

        <ul>
          <li>  
          <label htmlFor="name">주문처명</label>
            <input type="text" name="name" id="name" value={add.name} 
              onChange={onAddLocationFn} />
          </li>
          <li>  
          <label htmlFor="number">전화번호</label>
            <input type="text" name="number" id="number" value={add.number} 
              onChange={onAddLocationFn} />
          </li>
          <li>  
          <label htmlFor="x">X좌표</label>
            <input type="text" name="x" id="x" value={add.x} 
              onChange={onAddLocationFn} />
          </li>
          <li>  
          <label htmlFor="y">Y좌표</label>
            <input type="text" name="y" id="y" value={add.y} 
              onChange={onAddLocationFn} />
          </li>
          <li>
            <label htmlFor="imgchange">상품이미지</label>
            <input type='file' name="imgchange" id="imgchange" accept='image/*'
              onChange={(e)=> {
                const file = e.target.files[0];
                if (file) {
                  const imageUrl =  URL.createObjectURL(file)
                  setAdd({...add, img:imageUrl})
                }
              }}
              style={{width: '100%'}}             
              />
          </li>
          <li>
            <button onClick={onAddFn}>주문처등록</button>
            <button onClick={() => setIsAddModal(false)}>취소</button>
          </li>   
        </ul>
              </div>
      </div>
    </div>
  )
}

export default AdminAddLoctionModal