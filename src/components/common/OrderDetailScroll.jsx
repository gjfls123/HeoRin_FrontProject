import React from 'react'

const OrderDetailScroll = ({ onScrollDetail }) => {
  return (
    <div className="scroll">
      <button onClick={onScrollDetail}>TOP</button>
    </div>
  )
}

export default OrderDetailScroll