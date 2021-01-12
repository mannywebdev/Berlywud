import React from 'react'
import "./CarouselItem.css"

function CarouselItem({src}) {
    
    return (
            <img className="carouselimg" src={src} alt=""/>
    )
}
export default CarouselItem
