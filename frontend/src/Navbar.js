import React from 'react'
import './Navbar.css'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import logoblack from './images/blacklogo2025.png'
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import {signout} from './redux/actions/userActions'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

function Navbar() {
    const Cart = useSelector(state=> state.Cart)
    const dispatch = useDispatch()
    const {cartItems} = Cart
    const UserSignin = useSelector(state=> state.UserSignin)
    const { userInfo } = UserSignin
    const signoutHandler = () =>{
        dispatch(signout())
    }

    const StyledBadge = withStyles((theme) => ({
        badge: {
          right: -3,
          top: 13,
          border: `2px solid ${theme.palette.background.paper}`,
          padding: '0 4px',
        },
      }))(Badge)

    return (
        <div className="navbar">
            <Link className="navbar__link" style={{color: 'inherit', textDecoration: 'inherit'}} to="/">
            <div className="navbar__logo">
                <img src={logoblack} alt=""/>
            </div>
            </Link>
            <div className="navbar__option">
                <nav>
                    <a href="#mens">Men</a>
                    <a href="#womens">Women</a>
                    <a href="#unisex">Unisex</a>
                    <a href="#decantssplits">Decants & Splits</a>
                    <a href="#miniatures">Miniatures</a>
                </nav>
            </div>
            <div className="navbar__logincart">
                {
                    userInfo ? (
                        <div className="dropdown">
                            <Link className="link link__button" to='#'>
                            <Button
                                variant="contained"
                                endIcon={<ArrowDropDownIcon/>}
                            >
                            {userInfo.name}
                            </Button>
                            </Link>
                            <ul className="dropdown__content">
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
                        <div className="dropdown">
                            <Link className="link link__button" to='#admin'>
                            <Button
                                variant="contained"
                                endIcon={<ArrowDropDownIcon/>}
                            >
                            Admin
                            </Button>
                            </Link>
                            <ul className="dropdown__content">
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
    )
}

export default Navbar
