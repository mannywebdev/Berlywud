import React from 'react'
import "./Product.css"
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {addToBasket} from './redux/addToBasket'
import Rating from './Rating'


function Product({prop}) {
    const dispatch = useDispatch()
    function addOnClick(){
        dispatch(addToBasket({
            id: prop.id,
            title:prop.title,
            origprice:prop.origprice,
            decantprice:prop.decantprice.discprice,
            url: prop.url,
        }))
    }
   
    return (
        <div className="product">
        <Link style={{color: 'inherit', textDecoration: 'inherit'}} to={`/productpage/${prop.id}`}>
            <img className="product__img" src={prop.url} alt={prop.title}/>
            <div className="product__info">
                <p>{prop.title}</p>
                <span>Rs.{prop.decantprice.discprice}&nbsp;<del>Rs.{prop.origprice}</del></span>
            </div>
            <Rating rating={prop.rating} reviews={prop.reviews}/>
        </Link>
            <div className="product__btn">
                <button className="btn1" onClick={addOnClick}>Add to Cart</button>
                <button className="btn2">Quick View</button>
            </div>
        
        </div>
    )
}
export default Product