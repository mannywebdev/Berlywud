import React from 'react'
import './Navbar.css'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import logoblack from './images/blacklogo2025.png'
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function Navbar() {
    const Cart = useSelector(state=> state.Cart)
    const {cartItems} = Cart
    

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
                <Link className="link" to='/signin'>
                <div className='signin'>
                    <IconButton>
                        <AccountCircleIcon/>
                    </IconButton>
                </div>
                </Link>
                
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
