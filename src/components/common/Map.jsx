import React, { useEffect, useRef, useState } from 'react'
import { apiSearchKakaoFn } from '../../apis/shopPos'
import { DB_SERVER_URL } from '../../apis/commonApis'
import axios from 'axios'

const Map = () => {
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [orderList, setOrderList] = useState([])
  const [selectedName, setSelectedName] = useState('')

  const handleClick = (name) => {
    setSelectedName(name)
    apiSearchKakaoFn(name)
  }

  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        const res = await axios.get(`${DB_SERVER_URL}/order`)
        setOrderList(res.data)

        if (res.data.length > 0) {
          const firstName = res.data[0].name
          setSelectedName(firstName)
          apiSearchKakaoFn(firstName)
        }
      } catch (err) {
        console.error(err)
      }
    }

    fetchOrderList()
  }, [])

  useEffect(() => {
    if (!selectedName || orderList.length === 0) return

    const found = orderList.find((el) => el.name === selectedName)
    setSelectedOrder(found)
  }, [selectedName, orderList])

  const ulRef = useRef(null);

  const ulOnclick2 = (e) => {
    const cTarget = e.currentTarget
    const target = e.target
    
    Array.prototype.forEach.call(cTarget.children, (el)=> {
      if (el === target){        
        if(el.getAttribute('class') !== 'log') el.classList.add('c-ul')
      } else{
        el.classList.remove('c-ul')
      }
    })
  }

  return (
    <div className="map">
      <div className="map-con">
        <div className="title">
          <img src="/images/main/marker.png" alt="marker"/>
          <h1>지점찾기</h1>
        </div>
        <div className="top">
          <ul ref={ulRef} onClick={ulOnclick2}>
            {orderList.map((order) => (
              order.name==='노원점' ?
              <li className='c-ul'
              key={order.id}
              onClick={() => handleClick(order.name)}
            >
              {order.name}
            </li>
              : 
              <li
                key={order.id}
                onClick={() => handleClick(order.name)}
              >
                {order.name}
              </li>
            ))}
          </ul>

          {selectedOrder && (
            <div className="order-detail">
              <ul>
                <li>지점명 : {selectedOrder.name}</li>
                <li>전화번호 : {selectedOrder.number}</li>
                <li>위치 : {selectedOrder.x}, {selectedOrder.y}</li>
              </ul>
            </div>
          )}
        </div>

        <div className="bottom">
          <div className="bottom-con">
            <div id="map"></div>
            {selectedOrder && <img src={selectedOrder.img} alt="img" />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Map
