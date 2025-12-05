import React, { useEffect, useState } from 'react'

const Slide = () => {
  const slideImages = [
      {id: 0, img:"/images/back1.jpg"},
      {id: 1, img:"/images/back2.jpg"},
      {id: 2, img:"/images/back3.jpg"},
      {id: 3, img:"/images/back4.jpg"}    
    ]
    const [slideIdx,setSlideIdx ] = useState(0)
  
    useEffect(()=>{
      const inteval = setInterval(()=>{
        nextSlide()
      },3000)
  
      return() => clearInterval(inteval)
    },[slideIdx])
  
    const preSlide = () => {
      setSlideIdx(
        (preIdx) => (preIdx -1 + slideImages.length) % slideImages.length
      )
    }
    const nextSlide = () =>{
      setSlideIdx((preIdx)=>(preIdx +1) % slideImages.length)
    }
    return (
      <div className="slide">
        <div className="slide-con">
          {slideImages.map((image,index)=>(
            <img
              key={index}
              className={`banner_image ${index === slideIdx ? "active" : ""}`}
              src={image.img}
              alt={`slide ${index}`}
            />
          ))}
          <div className="prearrow">
            <img onClick={preSlide} src='/images/arrowleft.png'/>
            
          </div>
          <div className="nextarrow">
            <img onClick={nextSlide} src='/images/arrowright.png'/>
  
          </div>
        </div>
      </div>
    )
  }

export default Slide