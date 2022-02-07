import React from 'react'
import './CartItem.css'
import {useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, removeFromCart } from './redux/actions/cartActions'
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core'
import { ImBin } from "react-icons/im";

function CartItem({title,url,brand,price,product,stockcount,size,qty}) {
    const dispatch = useDispatch()
    console.log(`size`, size)
    console.log(`url`, url)
    const removeFromCartHandler = (product,price) =>{
        dispatch(removeFromCart(product,price))
    }

    return (
        <div className="cartitem">
            <div className="cartitem__img">
                {
                    (size === "Retail") && <img src={url[0]} alt=""/>
                }
                {
                    (size === "30ml") && <img src={url[1]} alt=""/>
                }
                {
                    (size === "10ml") && <img src={url[2]} alt=""/>
                }
                {
                    (size === "5ml") && <img src={url[3]} alt=""/>
                }
            </div>
            <div className="cartitem__info">
                <Link to={`/productpage/${product}`} className="link">
                <p>{brand}</p>
                <p>{title}</p>
                </Link>
                <div className="cartitem__info__pricesize">
                <span>Rs.{price}</span>
                <span>{size}</span>
                </div>
                <select value={qty} onChange={e => dispatch(addToCart(product,price,size,Number(e.target.value)))}>
                    { [...Array(stockcount).keys()].map(x => (
                        <option key={x+1} value={x+1}>{x+1}</option>
                    ))}
                </select>
                <ImBin className='cartitem__delete' onClick={()=> removeFromCartHandler(product,price)}/>  
            </div>
        </div>
    )
}

export default CartItem
