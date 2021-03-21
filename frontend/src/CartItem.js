import React from 'react'
import './CartItem.css'
import {useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, removeFromCart } from './redux/actions/cartActions'
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core'

function CartItem({title,url,brand,price,product,stockcount,size,qty}) {
    const dispatch = useDispatch()

    const removeFromCartHandler = (product,price) =>{
        dispatch(removeFromCart(product,price))
    }

    return (
        <div className="cartitem">
            <div className="cartitem__img">
                <img src={url} alt=""/>
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
                <IconButton aria-label="delete">
                    <DeleteIcon onClick={()=> removeFromCartHandler(product,price)}/>
                </IconButton>
                
            </div>
        </div>
    )
}

export default CartItem
