import { Button } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Errormsg from './Errormsg'
import Loadingmsg from './Loadingmsg'
import Ordersteps from './Ordersteps'
import './Payment.css'
import { detailsOrder } from './redux/actions/orderActions'

function Orderdetails() {

    const dispatch = useDispatch()
    const params = useParams()
    const orderId = params.id

    const OrderDetails = useSelector((state) => state.OrderDetails);
    const { order, loading, error } = OrderDetails;

    useEffect(() => {
        dispatch(detailsOrder(orderId))
      }, [dispatch, orderId]);

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
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Orderdetails
