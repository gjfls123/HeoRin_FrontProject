import React, { useState } from 'react'
import { DB_SERVER_URL } from '../../../apis/commonApis';
import axios from 'axios';

const addPrdData = {
  name:'',
  price:0 ,
  categories:'vodka',
  img:''
}

const AdminAddItemModal = ({setIsAddModal, fetchItemList}) => {

  const [add, setAdd] = useState(addPrdData)
  console.log(add);

  const onAddProductFn = (e) =>{
    const name = e.target.name
    const value = e.target.value
    console.log(name, value)

    setAdd({...add, [name]: value})
  }
  const onAddFn = (e) =>{

    const dataURL = `${DB_SERVER_URL}/items`
    const addAxiosFn = async() => {
      try {
        alert('상품등록실행')
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
        if (Number(add.price) <= 0) {
          alert('가격을 설정해주세요')
          return
        }  
        const addOk = await axios.post(`${dataURL}`,add)
        alert('상품등록 성공')
        fetchItemList()
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
        <h1>상품등록</h1>
        <div className="admin-modal-container">

        <ul>
          <li>
          <label htmlFor="name">상품명</label>
            <input type="text" name="name" id="name" value={add.name} 
              onChange={onAddProductFn} />
          </li>
          <li>
          <label htmlFor="price">가격</label>
            <input type="text" name="price" id="price" value={add.price} 
              onChange={onAddProductFn} />
          </li>
          <li>
          <label htmlFor="categories">카테고리</label>
          <select name="categories" id="categories"
            value={add.role}
            onChange={onAddProductFn}>          
            <option value='Vodka' defaultValue>보드카</option>
            <option value="Wine">와인</option>
            <option value="Whiskey">위스키</option>
            </select>
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
            <button onClick={onAddFn}>상품등록</button>
            <button onClick={() => setIsAddModal(false)}>취소</button>
          </li>
        </ul>
              </div>
      </div>
    </div>

  )
}

export default AdminAddItemModal