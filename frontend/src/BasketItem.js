import React from 'react'
import './BasketItem.css'
import {useDispatch} from 'react-redux'
import {removeFromBasket} from './redux/addToBasket'

function BasketItem({id,title,url,origprice,decantprice}) {
    const dispatch = useDispatch()
    function handleRemove(){
        dispatch(removeFromBasket({
            id:id,
        }))
    }
    return (
        <div className="basketitem">
            <div className="basketitem__img">
                <img src={url} alt=""/>
            </div>
            <div className="basketitem__info">
                <p>{title}</p>
                <span>Rs.{decantprice}</span>
                <div className="basketitem__btn">
                    <button onClick={handleRemove}>REMOVE</button>
                </div>
            </div>
        </div>
    )
}

export default BasketItem
