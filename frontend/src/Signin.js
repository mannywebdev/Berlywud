import React, { useEffect, useState } from 'react'
import './Signin.css'
import {useDispatch, useSelector} from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { signin } from './redux/actions/userActions'
import Loadingmsg from './Loadingmsg'
import Errormsg from './Errormsg'
import Button from '@material-ui/core/Button';
import GoogleLogin from 'react-google-login';
import { AiOutlineEye } from "react-icons/ai";
import { FiEye,FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

function Signin() {
    const dispatch = useDispatch()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [showPassword,setShowPassword] = useState(false)

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

    const handleClickShowPassword = (e) => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="signin">
            <>
            <form className="form" onSubmit={submitHandler}>
                <h2>Log in to your account</h2>
                {loading && <Loadingmsg/> }
                {error && <Errormsg>{error}</Errormsg>}
                <div>
                    <label htmlFor="email">Email</label>
                    <div className="inputfielddiv">
                        <input 
                        className="inputfield"
                        type="email" 
                        id="email"
                        placeholder="Enter email"
                        onChange={(e)=> setEmail(e.target.value)}>
                        </input>
                    </div>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <div className="inputfielddiv">
                        <input 
                        className="inputfield"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Enter password"
                        onChange={(e)=> setPassword(e.target.value)}>
                        </input>
                        <span class="p-viewer">
                            {showPassword ? <FiEye onClick={handleClickShowPassword}/> : <FiEyeOff onClick={handleClickShowPassword}/>}
                        </span>
                    </div>
                </div>
                <div className="pink__button">
                    <Button variant="contained" type="submit">Login</Button>
                </div>
                <GoogleLogin
                    clientId="988273385279-nhtg9hfjh0kidtum9jb8oj21mjiqnhfu.apps.googleusercontent.com"
                    render={renderProps => (
                    <button className="google__btn" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        <FcGoogle style={{fontSize: "25px"}}/>
                        &nbsp;<span>Google</span>
                    </button>
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
