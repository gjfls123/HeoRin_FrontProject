import React, { useEffect, useState } from 'react'
import { DB_SERVER_URL } from '../../../apis/commonApis'
import axios from 'axios'
import { useNavigate } from 'react-router'

const AdminItemModal = ({elId, setIsModal, fetchItemList}) => {
  // console.log(elId)

  const [item, setItem] = useState({})
  const dataURL = `${DB_SERVER_URL}/items`

  useEffect(() => {

    const onItemGetFn = async (itemId) => {
      try {
        const res = await axios.get(`${dataURL}?id=${itemId}`)  // 조회
        // console.log(res + " res")
        // console.log(res.data)
        // console.log(res.data[0])
        setItem(res.data[0])
      } catch (err) {
        alert(err)
      }
    }
    onItemGetFn(elId)
  }, [elId])  // id가 변할 때마다 
  const onChangeUpdateFn = (e) => {
    const name = e.target.name
    const value = e.target.value
    console.log(name + " , " + value)
    // setUpdate({ ...update, [name]: value })
    setItem({ ...item, [name]: value })
  }

  const options = [
    { op: '보드카', val: 'Vodka' },
    { op: '와인', val: 'Wine' },
    { op: '위스키', val: 'Whiskey' },
    { op: '엑세서리', val: 'Accessories' }
  ]

  const navigate = useNavigate()
  const updateOkFn = async () => {
    const updateAxiosFn = async (updatData) => {
      try {

        const res1 = await axios.get(`${dataURL}`)  // 조회
        const num = res1.data.findIndex(el => {
          return el.id === item.id
        })
        if (num === -1) {
          alert('상품 미존재')
          return
        }
        //=============================
        alert('상품수정실행!')
        const res = await axios.put(`${dataURL}/${updatData.id}`, updatData)
        console.log(res + ' <<< 상품 수정 res')
        fetchItemList()

      } catch (err) {
      }
    }
    updateAxiosFn(item)
  }
  const deleteOkFn = (e) => {

    const deleteAxiosFn = async (itemId) => {
      try {

        const res1 = await axios.get(`${dataURL}`)  // 조회
        const num = res1.data.findIndex(el => {
          return el.id === item.id
        })
        if (num === -1) {
          alert('상품이 존재하지 않습니다! 상품등록 먼저해주세요~')
          return
        }
        if(window.confirm("상품삭제실행")){
          const res = await axios.delete(`${dataURL}/${itemId}`)
          console.log(res + ' <<< 상품 삭제 res')
          fetchItemList()
        }else {
          alert('상품삭제취소')
        } 
      } catch (err) {
      }
    }
    deleteAxiosFn(item.id)
  }

  return (
    <div className="admin-modal">
      <div className="admin-modal-con">
        <span className="close" onClick={() => { setIsModal(false) }}>X</span>
        <h1>{item.name}의 상세정보</h1>
        <div className="admin-modal-container">
        <ul>
          {/* 아이디 숨기기*/}
          <li>
            <label htmlFor="id">ID</label>
            <input type="text" name="id" id="id" value={item.id || ''} readOnly
              onChange={onChangeUpdateFn} />
          </li>         
          <li>
            <label htmlFor="name">이름</label>
            <input type="text" name="name" id="name" placeholder='NAME'
              value={item.name || ''}
              onChange={onChangeUpdateFn} />
          </li>
          <li>
            <label htmlFor="price">가격</label>
            <input type="text" name="price" id="price" placeholder='PRICE'
              value={item.price || ''}
              onChange={onChangeUpdateFn} />
          </li>
          <li>
            <label htmlFor="img">이미지</label>
            <input type="text" name="img" id="img" placeholder='IMG'
              value={item.img || ''}
              onChange={onChangeUpdateFn} />
          </li>
          
          <li>
            <label htmlFor="categories">카테고리</label>
            <select name="categories" id="categories" value={item.categories || ''}
              onChange={onChangeUpdateFn}>
              {options.map((el) => (
                <option key={el.val} value={el.val}>{el.op}</option>
              ))}
            </select>
          </li>
          <li>
            <label htmlFor="imgchange">이미지변경</label>
            <input type='file' name="imgchange" id="imgchange" accept='image/*'
              onChange={(e)=> {
                const file = e.target.files[0];
                if (file) {
                  const imageUrl =  URL.createObjectURL(file)
                  setItem({...item, img:imageUrl})
                }
              }}
              style={{width: '100%'}}
              
              />
          </li>
          <li>
            <button onClick={updateOkFn} >상품수정</button>
            <button onClick={deleteOkFn}>상품삭제</button>
            <button onClick={() => navigate('/admin')}>HOME</button>
          </li>

        </ul>
          </div>
      </div>
    </div>
  )
  
}

export default AdminItemModal