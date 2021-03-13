import { Button } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Errormsg from './Errormsg'
import Loadingmsg from './Loadingmsg'
import Ordersteps from './Ordersteps'
import './Payment.css'

function Orderdetails() {

    const dispatch = useDispatch()
    const params = useParams()
    const orderId = params.id

    useEffect(() => {
        dispatch(detailsOrder(orderId))
      }, [dispatch, orderId]);
    return (
        <div className="payment">
            <Ordersteps step1 step2 step3/>
            <div className="payment__container">
                <div className="payment__left">
                    <div className="paymentleft__card">
                        <h3>Shipping Address</h3>
                        <p>
                            <span>Name: </span>{Cart.shippingAddress.fullName}<br/>
                            <span>Address: </span>{Cart.shippingAddress.address1},{Cart.shippingAddress.address2},{Cart.shippingAddress.city},{Cart.shippingAddress.state},{Cart.shippingAddress.pinCode}<br/>
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
                                                    <img src={item.url} alt=""/>
                                                </div>
                                                <div className="cardleft__info">
                                                    <p>{item.brand}</p>
                                                    <p>{item.title}</p>
                                                    <span>Qty: {item.qty}  Price: {item.price} </span>
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
                                <p>&#8377;{Cart.itemPrice.toFixed(2)}</p>
                            </div>
                            <div className="paymentright__div">
                                <p>Shipping Charge</p>
                                <p>&#8377;{Cart.shippingPrice.toFixed(2)}</p>
                            </div>
                            <div className="paymentright__div">
                                <p><strong>Total Price</strong></p>
                                <p><strong>&#8377;{Cart.totalPrice.toFixed(2)}</strong></p>
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

export default Orderdetails
