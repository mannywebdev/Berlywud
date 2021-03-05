import React from 'react'
import './Ordersteps.css'
function Ordersteps(props) {
    return (
        <div className="ordersteps">
            <div className={props.step1 ? 'active' : ''}>Login</div>
            <div className={props.step2 ? 'active' : ''}>Shipping</div>
            <div className={props.step3 ? 'active' : ''}>Payment</div>
            <div className={props.step4 ? 'active' : ''}>Place Order</div>
        </div>
    )
}

export default Ordersteps
