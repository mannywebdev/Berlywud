import { Button, IconButton } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import Errormsg from './Errormsg'
import Loadingmsg from './Loadingmsg'

import Ordersteps from './Ordersteps'
import './Payment.css'
import { createOrder } from './redux/actions/orderActions'
import { ORDER_CREATE_RESET } from './redux/constants/orderConstants'


function Payment() {
    const Cart = useSelector(state=> state.Cart)
    const { cartItems } = Cart
    const OrderCreate = useSelector((state) => state.OrderCreate);
    const { loading, success, error, order } = OrderCreate;
    const toNum = (num) => Number(num.toFixed(2)) //4.627 => "4.62" => 4.62
    Cart.itemPrice = Cart.cartItems.reduce((accumulator,item)=> item.price * item.qty + accumulator,0)
    Cart.shippingPrice = Cart.itemPrice > 999 ? toNum(0)  : toNum(99)
    Cart.totalPrice = Cart.itemPrice + Cart.shippingPrice
    const dispatch = useDispatch()
    const history = useHistory()
    const placeOrderHandler= () =>{
        dispatch(createOrder({...Cart,orderItems:cartItems}))
    }
    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
      }, [dispatch, order, history, success]);
    return (
        <div className="payment">
            <Ordersteps step1 step2 step3/>
            <div className="payment__container">
                <div className="payment__left">
                    <div className="paymentleft__card">
                        <h3>Shipping Address</h3>
                        <p>
                            <span>Name:&nbsp;</span>{Cart.shippingAddress.fullName}<br/>
                            <span>Address:&nbsp;</span>{Cart.shippingAddress.address1},{Cart.shippingAddress.address2},{Cart.shippingAddress.city},{Cart.shippingAddress.state},{Cart.shippingAddress.pinCode}<br/>
                        </p>
                    </div>
                    <div className="paymentleft__card">
                        <h3>Order Items</h3>
                        <div>
                            {
                                Cart.cartItems.map((item)=>{
                                    return (
                                        <Link to={`/productpage/${item.product}`} className="link">
                                        <div className="cardinner">
                                            <div className="cardleft">
                                                <div className="cardleft__img">
                                                    {
                                                        (item.size === "Retail") && <img src={item.url[0]} alt=""/>
                                                    }
                                                    {
                                                        (item.size === "30ml") && <img src={item.url[1]} alt=""/>
                                                    }
                                                    {
                                                        (item.size === "10ml") && <img src={item.url[2]} alt=""/>
                                                    }
                                                    {
                                                        (item.size === "5ml") && <img src={item.url[3]} alt=""/>
                                                    }
                                                </div>
                                                <div className="cardleft__info">
                                                    <p>{item.brand}</p>
                                                    <p>{item.title}</p>
                                                    <span>Qty: {item.qty}</span>
                                                    <span>Price: {item.price}</span>
                                                    <span>{item.size}</span>
                                                </div>
                                            </div>
                                            <span className="cardright">Total Rs.{item.qty*item.price}</span>
                                        </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="payment__right">
                    <div className="paymentleft__card">
                            <h3>Order Summary</h3>
                            <div className="paymentright__div">
                                <p>Price</p>
                                <p>Rs. {Cart.itemPrice.toFixed(2)}</p>
                            </div>
                            <div className="paymentright__div">
                                <p>Shipping Charge</p>
                                <p>Rs. {Cart.shippingPrice.toFixed(2)}</p>
                            </div>
                            <div className="paymentright__div">
                                <p><strong>Total Price</strong></p>
                                <p><strong>Rs. {Cart.totalPrice.toFixed(2)}</strong></p>
                            </div>
                            <div className="pink__button">
                                <Button variant="contained" onClick={placeOrderHandler} disabled={Cart.cartItems.length === 0}>Place Order</Button>
                            </div>
                            {loading && <Loadingmsg/>}
                            {error && <Errormsg variant="danger">{error}</Errormsg>}
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
