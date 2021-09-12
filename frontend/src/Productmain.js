import React,{useEffect, useState} from 'react'
import './Productmain.css'
import NotesRoundedIcon from '@material-ui/icons/NotesRounded';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {useHistory, useParams} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import Button from '@material-ui/core/Button';
import Loadingmsg from './Loadingmsg'
import Errormsg from './Errormsg'
import {productDetails} from './redux/actions/allProductsActions'
import Carousel ,{CarouselItem} from './Carousel'
import { CgDetailsMore } from "react-icons/cg";

function Productmain() {
    const dispatch = useDispatch()

    const [ml,setMl]= useState("Retail")  //State management for the size of perfume
    console.log(ml)

    const {productId} = useParams() //
    const history = useHistory()

    const ProductDetails = useSelector(state => state.ProductDetails)   
    const {loading,error,product} = ProductDetails

    useEffect(()=>{
        dispatch(productDetails(productId))
    },[dispatch,productId])


    function changePrice(e){
        const {value} = e.target
        setMl(value)
    }

    function addToCart(){
        history.push(`/cart/${productId}?price=${product.decantprice[ml]}&size=${ml}`)
    } 
    return (
        <div>
            {
                loading ? (
                    <Loadingmsg/> 
                ): error ? (
                    <Errormsg>{error}</Errormsg>
                ):(
                    <div className="productmain">
                        <div className="productmain__img">
                            <img src={product.url} alt={product.title}/>
                            <img src={product.url} alt={product.title}/>
                            <img src={product.url} alt={product.title}/>
                            <img src={product.url} alt={product.title}/>
                        </div>
                        <div className="productmain__img__mob">
                            <Carousel>
                                <CarouselItem><img className="carouselitem__img_mob" src={product.url} alt={product.title}/></CarouselItem>
                                <CarouselItem><img className="carouselitem__img_mob" src={product.url} alt={product.title}/></CarouselItem>
                                <CarouselItem><img className="carouselitem__img_mob" src={product.url} alt={product.title}/></CarouselItem>
                                <CarouselItem><img className="carouselitem__img_mob" src={product.url} alt={product.title}/></CarouselItem>
                            </Carousel>
                        </div>
                        <div className="productmain__info">
                            <div className="brandtitle">
                                <h3>{product.brand}</h3>
                                <p>{product.title}</p>
                            </div>

                            {(ml==="2ml" || ml==="5ml"|| ml==="10ml"|| ml==="30ml")?  
                                (<div className="productmain__pricing">
                                    <span>Rs.{product.decantprice[ml]}</span>
                                    <p>inclusive of all taxes</p>
                                </div>) : 
                                (<div className="productmain__pricing">
                                    <span>Rs.{product.decantprice.Retail}&nbsp;<del>Rs.{product.origprice}</del> </span>
                                    <span className="discount">({Math.floor(100-((product.decantprice.Retail/product.origprice)*100))}% off)</span>
                                    <p>inclusive of all taxes</p>
                                </div>  
                                )
                            }
                            <div className="productmain__button">
                                <p>Select Size</p>
                                <button value="2ml" onClick={changePrice}>2ml</button>
                                <button value="5ml" onClick={changePrice}>5ml</button>
                                <button value="10ml" onClick={changePrice}>10ml</button>
                                <button value="30ml" onClick={changePrice}>30ml</button>
                                <button value="Retail" onClick={changePrice}>Retail</button>
                            </div>
                            <div className="productmain__buttonwidth">
                            {
                                product.stockcount > 0 && (
                                    <div className="pink__button">
                                        <Button variant="contained" onClick={addToCart} size="large" startIcon={<ShoppingCartIcon/>}>Add to Cart</Button>
                                    </div>
                                )
                            }
                            </div>
                            <div className="productmain__status">
                                <span>Status: </span>
                                {product.stockcount > 0 ? <span className="success">Instock</span> : <span className="error">Out of stock</span>}
                            </div>
                            <div className="productmain__productdetails">
                                <h3>PRODUCT DETAILS<CgDetailsMore/></h3>
                                <h4>Notes</h4>
                                <p>Topnotes: {product.notes.Topnotes.join(', ')}</p>
                                <p>Middlenotes: {product.notes.Middlenotes.join(', ')}</p>
                                <p>Basenotes: {product.notes.Basenotes.join(', ')}</p>
                                <h4>Description</h4>
                                <p>{product.description}</p>
                                <h4>Launch year</h4>
                                <p>{product.launch}</p>
                                <h4>Concentration</h4>
                                <p>{product.concentration}</p>
                            </div>
                        </div>
                    </div>
                )
            } 
        </div>
    )
}
export default Productmain
