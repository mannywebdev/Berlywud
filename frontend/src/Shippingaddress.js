import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Ordersteps from './Ordersteps'
import { saveShippingAddress } from './redux/actions/cartActions'
import "./Shippingaddress.css"
import Subtotal from './Subtotal'

function Shippingaddress() {
    const UserSignin = useSelector(state=> state.UserSignin)
    const { userInfo } = UserSignin
    const Cart = useSelector(state => state.Cart)
    const { shippingAddress } = Cart
    
    const history = useHistory()
    console.log(`history`, history)
    if(!userInfo){
        history.push('/signin')
    }
    const [fullName,setFullName] = useState(shippingAddress.fullName)
    const [pinCode,setPinCode] = useState(shippingAddress.pinCode)
    const [address1,setAddress1] = useState(shippingAddress.address1)
    const [address2,setAddress2] = useState(shippingAddress.city)
    const [city,setCity] = useState(shippingAddress.city)
    const [state,setState] = useState(shippingAddress.state)
    

    const dispatch = useDispatch()
    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(saveShippingAddress({fullName,pinCode,address1,address2,city,state}))
        history.push('/payment')
    }
    
    return (
        <div className="shippingaddress">
            <Ordersteps step1 step2/>
            <div className="signin shippingaddress__main">    {/*used signin class for referencing styles from signin.css*/}
                <form className="form" onSubmit={submitHandler}>
                        <h2>Shipping Address</h2>
                        <div>
                            <label htmlFor="fullname">Full name (First and Last name)</label>
                            <input 
                            className="inputfieldtext"
                            type="text" 
                            id="fullname"
                            value={fullName}
                            onChange={(e)=> setFullName(e.target.value)}
                            required>
                            </input>
                        </div>
                        <div>
                            <label htmlFor="pincode">PIN code</label>
                            <input 
                            className="inputfieldtext"
                            type="number" 
                            id="pincode"
                            placeholder="6 digits [0-9] PIN code"
                            value={pinCode}
                            onChange={(e)=> setPinCode(e.target.value)}
                            required>
                            </input>
                        </div>
                        <div>
                            <label htmlFor="address1">Flat, House no., Building, Company, Apartment</label>
                            <input 
                            className="inputfieldtext"
                            type="text" 
                            id="address1"
                            value={address1}
                            onChange={(e)=> setAddress1(e.target.value)}
                            required>
                            </input>
                        </div>
                        <div>
                            <label htmlFor="address2">Area, Colony, Street, Sector, Village , Landmark</label>
                            <input 
                            className="inputfieldtext"
                            type="text" 
                            id="address2"
                            placeholder="E.g Near Roman apt. sector-62 ,e.t.c"
                            value={address2}
                            onChange={(e)=> setAddress2(e.target.value)}>
                            </input>
                        </div>
                        <div>
                            <label htmlFor="city">Town/City</label>
                            <input 
                            className="inputfieldtext"
                            type="text" 
                            id="city"
                            value={city}
                            onChange={(e)=> setCity(e.target.value)}
                            required>
                            </input>
                        </div>
                        <div>
                            <label htmlFor="state">State/Region</label>
                            <input 
                            className="inputfieldtext"
                            type="text" 
                            id="state"
                            placeholder="E.g MP,Punjab,Gujarat"
                            value={state}
                            onChange={(e)=> setState(e.target.value)}
                            required>
                            </input>
                        </div>
                        <div className="pink__button">
                            <Button variant="contained" type="submit">Continue</Button>
                        </div>
                </form>
                <div className="shippingaddress__right">
                    <Subtotal/>
                </div>
            </div>
        </div>
    )
}

export default Shippingaddress
