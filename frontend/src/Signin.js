import React, { useEffect, useState } from 'react'
import './Signin.css'
import {useDispatch, useSelector} from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { signin } from './redux/actions/userActions'
import Loadingmsg from './Loadingmsg'
import Errormsg from './Errormsg'
import Button from '@material-ui/core/Button';
import GoogleLogin from 'react-google-login';

function Signin() {
    const dispatch = useDispatch()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const locationsignin = useLocation()
    const historysignin = useHistory()
    const redirect = locationsignin.search ? locationsignin.search.split('=')[1] : '/'

    const UserSignin = useSelector(state=> state.UserSignin)
    const { userInfo,loading,error } = UserSignin
    
    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(signin(email,password))
    }
    useEffect(()=>{
        if(userInfo){
            historysignin.push(redirect)
        }
    },[userInfo,redirect,historysignin])

    const googleSuccess = (response) =>{
        console.log(response);
    }
    const googleFailure = (error) =>{
        console.log(error);
    }

    return (
        <div className="signin">
            <>
            <form className="form" onSubmit={submitHandler}>
                <h2>Log in to your account</h2>
                {loading && <Loadingmsg/> }
                {error && <Errormsg>{error}</Errormsg>}
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                    className="inputfieldtext"
                    type="email" 
                    id="email"
                    placeholder="Enter email"
                    onChange={(e)=> setEmail(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                    className="inputfieldtext"
                    type="password" 
                    id="password"
                    placeholder="Enter password"
                    onChange={(e)=> setPassword(e.target.value)}>
                    </input>
                </div>
                <div className="pink__button">
                    <Button variant="contained" type="submit">Login</Button>
                </div>
                <GoogleLogin
                    clientId="988273385279-nhtg9hfjh0kidtum9jb8oj21mjiqnhfu.apps.googleusercontent.com"
                    render={renderProps => (
                    <button onClick={renderProps.onClick} disabled={renderProps.disabled}>Google</button>
                    )}
                    buttonText="Login"
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy={'single_host_origin'}
                />  
                <div>
                    <span>New Customer?</span> <Link to={`/register?redirect=${redirect}`} className="link link__pink">Create your account</Link>
                </div>
            </form>
            </>
        </div>
    )
}

export default Signin
