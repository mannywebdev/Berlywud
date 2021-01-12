import React from 'react'
import './Subtotal.css'
import CurrencyFormat from "react-currency-format"
import { getBasketDiscTotal } from './redux/addToBasket'
import { getBasketOrigTotal } from './redux/addToBasket'
import {useSelector} from 'react-redux'

function Subtotal() {
    var deliveryCharge= 99;
    const {Basket} = useSelector(state => state)
    return (
        <div className="subtotal">
            <CurrencyFormat renderText={(value)=>(
                <>
                    <div>
                        <h4>PRICE DETAILS ({Basket.length} Item)</h4>
                        <table>
                            <tr>
                                <td>Total MRP</td>
                                <td className="rates">&#8377;{getBasketOrigTotal(Basket)}</td>
                            </tr>
                            <tr>
                                <td>Discount on MRP</td>
                                <td className="rates">-&#8377;{getBasketOrigTotal(Basket)-getBasketDiscTotal(Basket)}</td>
                            </tr>
                            <tr>
                                <td>Delivery Charges</td>
                                <td className="rates">&#8377;{deliveryCharge}</td>
                            </tr>
                            <tr>
                                <th>Total Amount</th>
                                <td className="rates">{value}</td>
                            </tr>
                        </table>
                    </div>
                </>
            )}
            decimalScale={2}
            value={getBasketDiscTotal(Basket)+deliveryCharge}
            displayType={"text"}
            thousandSeperator={true}
            prefix={"₹"}
            />
        </div>
    )
}

export default Subtotal
