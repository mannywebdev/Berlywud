import { Button } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Errormsg from './Errormsg'
import Loadingmsg from './Loadingmsg'
import './Payment.css'
import { deliverOrder, detailsOrder, payOrder } from './redux/actions/orderActions'
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from './redux/constants/orderConstants'

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

    const UserSignin = useSelector(state=> state.UserSignin)
    const { userInfo } = UserSignin

    const orderDeliver = useSelector((state) => state.OrderDeliver);
  const {loading: loadingDeliver,error: errorDeliver,success: successDeliver,} = orderDeliver;

    const orderPay = useSelector((state) => state.orderPay);
    const {loading: loadingPay,error: errorPay,success: successPay} = orderPay;

    useEffect(() => {
        if(!order || successPay || successDeliver || (order && order._id !== orderId)){
            dispatch({ type: ORDER_PAY_RESET });
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(detailsOrder(orderId))
        }
    }, [dispatch,orderId,order,successPay,successDeliver]);

    const __DEV__ = document.domain === "localhost"

    async function displayRazorpay(){
        const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js")
        if(!res){
            alert('Razorpay Sdk failed to load...')
            return
        }
        // const data = await fetch('http://localhost:5000/razorpay', {method: 'POST'}).then((response)=> 
        //     res.json()
        // ) 
        const data= {
            amount:(order.totalPrice*100).toString(),
        }
        const option={
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(data)
        };
        const razorpayorder =  await fetch('http://localhost:5000/razorpay',option).then((t)=>t.json())
        console.log('razorpayorder',razorpayorder)

        const options = {
            "key": __DEV__ ? "rzp_test_tjgqJf8OgEA215" : process.env.RZP_PUBLIC_KEY, 
            "amount": razorpayorder.amount, //100paise = 1rs / Paying 5 rs
            "currency": "INR",
            "name": "Berlywud",
            "description": "Feed Your Senses",
            "image": 'http://localhost:5000/berlywud.png',
            "order_id": razorpayorder.id,
             //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": async function (response){
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature)
                const data = {
                    orderCreationId: razorpayorder.id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                }
                const result = await axios.post("http://localhost:5000/payment/success",data);
                if(result.data.msg === "success"){
                    dispatch(payOrder(order,result))
                }
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

    // const successPaymentHandler = (paymentResult) => {
    //     dispatch(payOrder(order, paymentResult));
    // };
    const deliverHandler = () => {
        dispatch(deliverOrder(order._id));
    };


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
                            {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <div className="pink__button">
                                {loadingDeliver && <Loadingmsg/>}
                                {errorDeliver && (
                                    <Errormsg variant="danger">{errorDeliver}</Errormsg>
                                )}
                                <Button variant="contained" onClick={deliverHandler}>Deliver Order</Button>
                                </div>
                            )}
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Orderdetails
