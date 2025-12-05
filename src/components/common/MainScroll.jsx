import React from 'react'

const MainScroll = ({ onScrollMain, onScrollMap }) => {
  return (
    <div className="scroll">
      <button onClick={onScrollMain}>메인</button>
      <button onClick={onScrollMap}>지점</button>
    </div>
  )
}

export default MainScroll