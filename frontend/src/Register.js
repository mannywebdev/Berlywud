import React, { useEffect, useState } from 'react'
import './Register.css'
import {useDispatch, useSelector} from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { register } from './redux/actions/userActions'
import Loadingmsg from './Loadingmsg'
import Errormsg from './Errormsg'
import Button from '@material-ui/core/Button';

function Register() {
    const dispatch = useDispatch()
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")

    const location = useLocation()
    const history = useHistory()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const UserRegister = useSelector(state=> state.UserRegister)
    const { userInfo,loading,error } = UserRegister
    
    const submitHandler = (e) =>{
        e.preventDefault()
        if(password !== confirmPassword){
            alert("Passwords doesn't match")
        }else{
            dispatch(register(name,email,password))
        }
    }
    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[userInfo,redirect,history])

    return (
        <div className="signin">
            <>
            <form className="form" onSubmit={submitHandler}>
                <h2>Create Account</h2>
                {loading && <Loadingmsg/> }
                {error && <Errormsg>{error}</Errormsg>}
                <div>
                    <label htmlFor="name">Name</label>
                    <input 
                    type="text" 
                    id="name"
                    placeholder="Enter name"
                    onChange={(e)=> setName(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                    type="email" 
                    id="email"
                    placeholder="Enter email"
                    onChange={(e)=> setEmail(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                    type="password" 
                    id="password"
                    placeholder="Enter password"
                    onChange={(e)=> setPassword(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="confirmpassword">Confirm Password</label>
                    <input 
                    type="password" 
                    id="confirmpassword"
                    placeholder="Enter password again"
                    onChange={(e)=> setConfirmPassword(e.target.value)}>
                    </input>
                </div>
                <div className="pink__button">
                    <Button variant="contained" type="submit">Continue</Button>
                </div>
                
                <div>
                    <span>Already have an account?</span> <Link to={`/signin?redirect=${redirect}`} className="link link__pink">Login</Link>
                </div>
            </form>
            </>
        </div>
    )
}

export default Register
