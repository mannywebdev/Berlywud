import React from 'react'
import './Navbar.css'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

function Navbar() {
    const {Basket} = useSelector(state=>state)
    return (
        <div className="navbar">
            <Link className="navbar__link" style={{color: 'inherit', textDecoration: 'inherit'}} to="/">
            <div className="navbar__logo">
                <img src="logos\final black 2025 logo.png" alt=""/>
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
                <div>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" class="svg-inline--fa fa-user fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>
                </div>
                <Link className="bag-link" to='/checkout'>
                <div className="bag">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="shopping-bag" class="svg-inline--fa fa-shopping-bag fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M352 160v-32C352 57.42 294.579 0 224 0 153.42 0 96 57.42 96 128v32H0v272c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V160h-96zm-192-32c0-35.29 28.71-64 64-64s64 28.71 64 64v32H160v-32zm160 120c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zm-192 0c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24z"></path></svg>
                    <span>{Basket.length}</span>
                </div>
                </Link>
            </div>
        </div>
    )
}

export default Navbar
