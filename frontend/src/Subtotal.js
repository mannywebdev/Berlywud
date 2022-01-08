import React from 'react'
import './Subtotal.css'
import {useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { green, purple } from '@material-ui/core/colors';

function Subtotal() {

    const Cart = useSelector(state=> state.Cart)
    const {cartItems} = Cart
    
    const toNum = (num) => Number(num.toFixed(2))
    const totalMRP = toNum(cartItems.reduce((accumulator,item)=> item.price * item.qty + accumulator,0))
    const deliveryCharge = totalMRP > 999 ? toNum(0) : toNum(99)
    const totalAmount = totalMRP + deliveryCharge


    return (
        <div className="subtotal">
            <div>
                <h4>PRICE DETAILS ({cartItems.reduce((accumulator,item)=> item.qty + accumulator ,0)} Item)</h4>
                <table>
                    <tr>
                        <td>Total MRP</td>
                        <td className="rates">Rs. {totalMRP.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Delivery Charges</td>
                        <td className="rates">Rs. {deliveryCharge.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Total Amount</td>
                        <td className="rates bt">Rs. {totalAmount.toFixed(2)}</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}
export default Subtotal
