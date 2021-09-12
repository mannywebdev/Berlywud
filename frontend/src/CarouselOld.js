import React, { useState } from 'react'
import './Carousel.css'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CarouselItem from './CarouselItem'
import { brown, grey, red } from '@material-ui/core/colors';


function Carousel() {

    const carouselArray=[<CarouselItem src={"logos/i1.png"}/>,<CarouselItem src={"logos/i2.png"}/>,<CarouselItem src={"logos/i3.png"}/>,<CarouselItem src={"logos/i4.png"}/>]
    const [x,setX] =useState(0)
    function goLeft(){
        console.log(x)
        x===0 ? setX(-100*(carouselArray.length-1)) :setX(x+100);
    }
    function goRight(){
        console.log(x)
        x=== -100*(carouselArray.length-1) ? setX(0) :setX(x-100);
    }
    return (
        <div className="carousel">
            {carouselArray.map((item,index)=> 
                <div className="carousel__slide" style={{transform:`translateX(${x}%)`}} key={index}>{item}</div>
            )}
            <button className="carouselleft__btn" onClick={goLeft}><ChevronLeftIcon style={{ color: grey[700],fontSize: 50 }}/></button>
            <button className="carouselright__btn" onClick={goRight}><ChevronRightIcon style={{ color: grey[700],fontSize: 50 }}/></button>
        </div>
    )
}

export default Carousel


