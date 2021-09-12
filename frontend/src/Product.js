import React from 'react'
import "./Product.css"
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import Rating from './Rating'


function Product({prop}) {
    const dispatch = useDispatch()
    // function addOnClick(){
    //     dispatch(addToCart())
    // }
   
    return (
        <div className="product">
        <Link style={{color: 'inherit', textDecoration: 'inherit'}} to={`/productpage/${prop._id}`}>
            <img className="product__img" src={prop.url} alt={prop.title}/>
            <div className="product__info">
                <p>{prop.title}</p>
                <span>Rs.{prop.decantprice.Retail}&nbsp;<del>Rs.{prop.origprice}</del></span>
            </div>
            <Rating rating={prop.rating} reviews={prop.reviews}/>
        </Link>
            {/* <div className="product__btn">
                <button className="btn1">Add to Cart</button>
                <button className="btn2">Quick View</button>
            </div> */}
        
        </div>
    )
}
export default Product
