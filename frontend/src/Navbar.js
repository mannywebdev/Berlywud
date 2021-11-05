import React, { useEffect, useRef, useState } from 'react'
import './Navbar.css'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import BERLYWUD from './images/BERLYWUD.png'
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import {signout} from './redux/actions/userActions'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SearchBox from './SearchBox'
import { listProductCategories } from './redux/actions/allProductsActions'
import { FiMenu } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
import { useOutsideAlerter1, useOutsideAlerter2, useOutsideAlerter3 } from './OutsideAlert'

function Navbar() {

    // const [click,setClick]= useState(false)
    const {click,setClick,ref1} = useOutsideAlerter1(false)
    const {userDropdownStatus,setUserDropdownStatus,ref2}= useOutsideAlerter2(false)
    const {adminDropdownStatus,setAdminDropdownStatus,ref3}= useOutsideAlerter3(false)

    const handleClick = () => {
        setClick(!click)
        setUserDropdownStatus(false)
        setAdminDropdownStatus(false)
    }
    const handleUserDropdown = () => {
        setClick(false)
        setAdminDropdownStatus(false)
        setUserDropdownStatus(!userDropdownStatus)
    }
    const handleAdminDropdown = () => {
        setClick(false)
        setUserDropdownStatus(false)
        setAdminDropdownStatus(!adminDropdownStatus)
    }

    const Cart = useSelector(state=> state.Cart)
    const dispatch = useDispatch()
    const {cartItems} = Cart
    const UserSignin = useSelector(state=> state.UserSignin)
    const { userInfo } = UserSignin
    
    if(userInfo){
        var name = userInfo.name
        var matches = name.match(/\b(\w)/g); // ['J','S','O','N']
        var acronym = matches.join('');
    }
    
    const signoutHandler = () =>{
        dispatch(signout())
    }


    useEffect(() => {
        dispatch(listProductCategories());
      }, [dispatch,]);

    const StyledBadge = withStyles((theme) => ({
        badge: {
          right: -3,
          top: 13,
          border: `2px solid ${theme.palette.background.paper}`,
          padding: '0 4px',
        },
      }))(Badge)

    return (
        <div className="navbar__outer">
        <div className="navbar">
            <Link className="navbar__link" style={{color: 'inherit', textDecoration: 'inherit'}} to="/">
            <div className="navbar__logo">
                <div className="hamburger__cancel" onClick = {handleClick}>
                {
                    click ? <ImCancelCircle/> : <FiMenu/> 
                }    
                </div>
                <img src={BERLYWUD} alt=""/>
            </div>
            </Link>
            <div className={click ? "navbar__option active" : "navbar__option"} ref={ref1}>
                <Link className="navbar__link navbar__category" onClick={handleClick} style={{color: 'inherit', textDecoration: 'inherit'}} to="/">Men</Link>
                <Link className="navbar__link navbar__category" onClick={handleClick} style={{color: 'inherit', textDecoration: 'inherit'}} to="/">Women</Link>
                <Link className="navbar__link navbar__category" onClick={handleClick} style={{color: 'inherit', textDecoration: 'inherit'}} to="/">Unisex</Link>
            </div>
            
            <div className="small__searchbox">
                <SearchBox/>
            </div>
            
            <div className="navbar__logincart">
                {
                    userInfo ? (
                        <div className="dropdown"  onClick={handleUserDropdown} ref={ref2}>
                            <Link className="link link__button" to='#'>
                            <Button
                                variant="contained"
                                endIcon={<ArrowDropDownIcon/>}
                                className="navbar__btn"
                            >
                            {
                                acronym    
                            }
                            </Button>
                            </Link>
                            <ul className={userDropdownStatus ? "dropdown__content active" : "dropdown__content"}>
                                <Link to="/orderhistory" className="link"><li>Order History</li></Link>
                                <Link to="/profile" className="link"><li>My Profile</li></Link>
                                <Link to="#signout" className="link" onClick={signoutHandler}><li>Logout</li></Link>
                            </ul>
                        </div>
                    ):
                    (
                        <Link className="link link__button" to='/signin'>
                         <Button
                                variant="contained"
                            >
                            Login
                        </Button>
                        </Link>
                    )
                }
                {
                    userInfo && userInfo.isAdmin &&
                        <div className="dropdown" onClick={handleAdminDropdown} ref={ref3}>
                            <Link className="link link__button" to='#admin'>
                            <Button
                                className="navbar__btn"
                                variant="contained"
                                endIcon={<ArrowDropDownIcon/>}
                            >
                            Admin
                            </Button>
                            </Link>
                            <ul className={adminDropdownStatus ? "dropdown__content active" : "dropdown__content"}>
                                <Link to="/dashboard" className="link"><li>Dashboard</li></Link>
                                <Link to="/productlist" className="link"><li>Products</li></Link>
                                <Link to="/orderlist" className="link" ><li>Orders</li></Link>
                                <Link to="/userlist" className="link"><li>Users</li></Link>
                            </ul>
                        </div>
                }
                
                <Link className="link" to='/cart'>
                <div className="cart">
                    {cartItems.length > 0 ? (
                        <IconButton aria-label="cart">
                        <StyledBadge badgeContent={cartItems.length} color="secondary">
                            <ShoppingCartIcon />
                        </StyledBadge>
                        </IconButton>
                    ):(
                        <IconButton aria-label="cart">
                            <ShoppingCartIcon/>
                        </IconButton>
                    )}
                </div>
                </Link>
            </div>
        </div>
        <div className="big__searchbox">
            <SearchBox/>
        </div>
        </div>
        
    )
}

export default Navbar
