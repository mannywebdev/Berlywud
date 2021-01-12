import React from 'react'
import './Checkout.css'
import BasketItem from './BasketItem'
import { useSelector } from 'react-redux';
import Subtotal from './Subtotal'
import {getBasketDiscTotal} from './redux/addToBasket'


function Checkout() {
    const {Basket}= useSelector(state=> state)

    const render = (Basket.length <= 0) ? 
    (<div className="checkout__products">
        <div className="checkout__quotes">
            <img src="logos\emptybag.png" width="100%" alt="emptybasket"/>
            <p>Hey,it feels so light!</p>
            <p>There is nothing in your bag.Let's add some items.</p>
        </div>
    </div>
    ) : 
    (<div className="checkout__products">
    {
        Basket.map((item)=>{
            return (
            <BasketItem 
            id={item.id}
            url={item.url}
            title={item.title}
            origprice={item.origprice}
            decantprice={item.decantprice}
            />
            )
        })
    }
    </div>)

    const emptybag = (Basket.length <= 0)? 
    (<div style={{margin: "2% auto"}} className="checkout__left">
        <div className="checkout-values">
            <h4>My Shopping Bag ({Basket.length} item)</h4>
            <h4>Total: ₹ 0</h4>
        </div>
        {render}
    </div>
    ):
    (
    <div className="checkout">
        <div className="checkout__left">
            <div className="checkout-values">
                <h4>My Shopping Bag ({Basket.length} item)</h4>
                <h4>Total: ₹ {getBasketDiscTotal(Basket)}</h4>
            </div>
            {render}
        </div>
        <div className="checkout__right">
            <Subtotal/>
        </div>
    </div>
    

    )

    return (
        emptybag
    )
}
export default Checkout
