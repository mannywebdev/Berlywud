import React, { useEffect } from 'react'
import './Cart.css'
import { useDispatch, useSelector } from 'react-redux';
import Subtotal from './Subtotal'

import { Link, useLocation, useParams } from 'react-router-dom';
import { addToCart } from './redux/actions/cartActions'
import CartItem from './CartItem';
import emptybag from './images/emptybag.png'
import { Button } from '@material-ui/core';

function Cart() {
    const dispatch = useDispatch()
    const {productId} = useParams() 
    const location = useLocation()
    const price = Number(location.search.split("=")[1])

    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId,price))
        }
    },[productId])

    
    const Cart = useSelector(state=> state.Cart)
    const {cartItems} = Cart
    
    const render = 
        (cartItems.length <= 0) ? 
        (<div className="cart__products">
            <div className="cart__quotes">
                <img src={emptybag} width="100%" alt="emptycartItems"/>
                <p>Hey,it feels so light!</p>
                <p>There is nothing in your bag.Let's add some items.</p>
                <Link to='/' className='link'>
                <Button variant="outlined">
                Go back to Shopping.
                </Button>
                </Link>
            </div>
        </div>
        ) : 
        (<div className="cart__products">
        {
            cartItems.map((item)=>{
                return (
                    <CartItem
                    product={item.product}
                    brand={item.brand}
                    title={item.title}
                    price={item.price}
                    url={item.url}
                    qty={item.qty}
                    stockcount={item.stockcount}
                    />
                )
            })
        }
        </div>)
    
    return (
        <>
            {
                (cartItems.length <= 0)? 
                (<div className="cart">
                    <div style={{margin: "2% auto"}} className="cart__left">
                        <div className="cart-values">
                            <h4>My Shopping Bag ({cartItems.length} item)</h4>
                            <h4>Total: ₹ 0</h4>
                        </div>
                        {render}
                    </div>
                </div>
                ):
                (<div className="cart">
                    <div className="cart__left">
                        <div className="cart-values">
                            <h4>My Shopping Bag ({cartItems.length} item)</h4>
                            <h4>Total: ₹ {cartItems.reduce((accumulator,item)=> item.price * item.qty + accumulator,0)}</h4>
                        </div>
                        {render}
                    </div>
                    <div className="cart__right">
                        <Subtotal/>
                    </div>
                </div>)
            }
        </>
    )
}
export default Cart
