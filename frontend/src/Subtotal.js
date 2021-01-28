import React from 'react'
import './Subtotal.css'
import {useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { green, purple } from '@material-ui/core/colors';

function Subtotal() {
    var deliveryCharge= 99;

    const Cart = useSelector(state=> state.Cart)
    const {cartItems} = Cart
    const history = useHistory()

    const totalMRP = cartItems.reduce((accumulator,item)=> item.price * item.qty + accumulator,0)
    const totalAmount = totalMRP + deliveryCharge

    const checkoutHandler = () => {
        history.push('/signin?redirect=shipping')
    }


    return (
        <div className="subtotal">
            <div>
                <h4>PRICE DETAILS ({cartItems.reduce((accumulator,item)=> item.qty + accumulator ,0)} Item)</h4>
                <table>
                    <tr>
                        <td>Total MRP</td>
                        <td className="rates">&#8377;{totalMRP}</td>
                    </tr>
                    <tr>
                        <td>Delivery Charges</td>
                        <td className="rates">&#8377;{deliveryCharge}</td>
                    </tr>
                    <tr>
                        <td className="bt">Total Amount</td>
                        <td className="rates bt">&#8377;{totalAmount}</td>
                    </tr>
                </table>
            </div>
            <div className="subtotal__button">
                <Button variant="contained" onClick={checkoutHandler}>Proceed to Checkout</Button>
            </div>
        </div>
    )
}
export default Subtotal
