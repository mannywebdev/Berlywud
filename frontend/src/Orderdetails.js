import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Errormsg from './Errormsg'
import Loadingmsg from './Loadingmsg'
import './Payment.css'
import { detailsOrder } from './redux/actions/orderActions'

const loadRazorpay= (src)=>{
    return new Promise((resolve)=>{
        const script= document.createElement('script')
        script.src= src
        document.body.appendChild(script)
        script.onload = ()=>{
            resolve(true)
        }
        script.onerror = ()=>{
            resolve(false)
        }
    })
}


function Orderdetails() {

    const dispatch = useDispatch()
    const params = useParams()
    const orderId = params.id
    

    const OrderDetails = useSelector((state) => state.OrderDetails);
    const { order, loading, error } = OrderDetails;

    useEffect(() => {
        dispatch(detailsOrder(orderId))
    }, [dispatch,orderId]);

    const __DEV__ = document.domain === "localhost"

    async function displayRazorpay(){
        const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js")
        if(!res){
            alert('Razorpay Sdk failed to load...')
            return
        }
        const options = {
            "key": __DEV__ ? "rzp_test_tjgqJf8OgEA215" : process.env.RZP_PUBLIC_KEY, 
            "amount": "100", //100paise = 1rs / Paying 5 rs
            "currency": "INR",
            "name": "Berlywud",
            "description": "Feed Your Senses",
            "image": "./images/greylogo2025.png",
             //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response){
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature)
            },
            "prefill": {
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "9999999999"
            }
        };
        var paymentObject = new window.Razorpay(options);
        paymentObject.open()
    }

    return loading ? (
                <Loadingmsg/> 
                ): error ? (
                    <Errormsg>{error}</Errormsg>
                ):
    (
        <div className="payment">
            
            <div className="payment__container">
                <div className="payment__left">
                    <h3>Order {order._id}</h3>
                    <div className="paymentleft__card">
                        <h3>Shipping Address</h3>
                        <p>
                            <span>Name: </span>{order.shippingAddress.fullName}<br/>
                            <span>Address: </span>{order.shippingAddress.address1},{order.shippingAddress.address2},{order.shippingAddress.city},{order.shippingAddress.state},{order.shippingAddress.pinCode}<br/>
                        </p>
                        {order.isDelivered ? <Errormsg>Delivered at :{order.deliveredAt}</Errormsg>:<Errormsg>Not Delivered</Errormsg>}
                    </div>
                    <div className="paymentleft__card">
                        <h3>Payment</h3>
                        <p>
                        <span>Method: </span>Paypal<br/>
                        </p>
                        {order.isPaid ? <Errormsg>Paid at:{order.paidAt}</Errormsg>:<Errormsg>Not Paid</Errormsg>}
                    </div>

                    <div className="paymentleft__card">
                        <h3>Order Items</h3>
                        <div>
                            {
                                order.orderItems.map((item)=>{
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
                                                    <span>Qty: {item.qty} </span>
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
                                <p>&#8377;{order.itemPrice.toFixed(2)}</p>
                            </div>
                            <div className="paymentright__div">
                                <p>Shipping Charge</p>
                                <p>&#8377;{order.shippingPrice.toFixed(2)}</p>
                            </div>
                            <div className="paymentright__div">
                                <p><strong>Total Price</strong></p>
                                <p><strong>&#8377;{order.totalPrice.toFixed(2)}</strong></p>
                            </div>
                            {
                                !order.isPaid &&
                                (
                                <div className="pink__button">
                                    <Button variant="contained" onClick={displayRazorpay}>Pay</Button>
                                </div>
                                )
                            }
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Orderdetails
