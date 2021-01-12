import React,{useState} from 'react'
import './Productmain.css'
import NotesRoundedIcon from '@material-ui/icons/NotesRounded';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {useParams} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {addToBasket} from './redux/addToBasket'
import Button from '@material-ui/core/Button';

function Productmain() {
    const dispatch = useDispatch()

    const [ml,setMl]= useState("discprice")  //State management for the size of perfume
    console.log(ml)

    const {productId} = useParams() //

    const {AllProducts} = useSelector(state => state)   //getting AllProducts from Store

    const thisProduct = AllProducts.find((item) => item.id === productId )   //finding the item with specific productId
    console.log(thisProduct)
    
    const discount = Math.floor(100-((thisProduct.decantprice.discprice/thisProduct.origprice)*100)); // counting the % off to be given
    
    const pricing = (ml==="twoml" || ml==="fiveml"|| ml==="tenml"|| ml==="thirtyml")?  
    (<div className="productmain__pricing">
        <span>Rs.{thisProduct.decantprice[ml]}</span>
        <p>inclusive of all taxes</p>
    </div>) : 
    (<div className="productmain__pricing">
        <span>Rs.{thisProduct.decantprice[ml]}&nbsp;<del>Rs.{thisProduct.origprice}</del> </span>
        <span className="discount">({discount}% off)</span>
        <p>inclusive of all taxes</p>
    </div>  
    )

    function changePrice(e){
        const {value} = e.target
        setMl(value)
    }

    function addOnClick(){
        dispatch(addToBasket({
            id: thisProduct.id,
            title:thisProduct.title,
            origprice:thisProduct.origprice,
            discprice:thisProduct.discprice,
            url: thisProduct.url,
            decantprice: thisProduct.decantprice[ml]
        }))
    }

    return (
        
        <div className="productmain">
            <div className="productmain__img">
                <img src={thisProduct.url} alt={thisProduct.title}/>
                <img src={thisProduct.url} alt={thisProduct.title}/>
                <img src={thisProduct.url} alt={thisProduct.title}/>
                <img src={thisProduct.url} alt={thisProduct.title}/>
            </div>
            <div className="productmain__info">
                <div className="brandtitle">
                    <h3>{thisProduct.brand}</h3>
                    <p>{thisProduct.title}</p>
                </div>
                {pricing}
                <div className="productmain__button">
                    <p>Select Size</p>
                    <button value="twoml" onClick={changePrice}>2ml</button>
                    <button value="fiveml" onClick={changePrice}>5ml</button>
                    <button value="tenml" onClick={changePrice}>10ml</button>
                    <button value="thirtyml" onClick={changePrice}>30ml</button>
                    <button value="discprice" onClick={changePrice}>Retail</button>
                </div>
                <div className="productmain__addtocart">
                    <Button onClick={addOnClick} size="large" startIcon={<ShoppingCartIcon/>}>Add to Cart</Button>
                </div>
                <div className="productmain__status">
                    <span>Status: </span>
                    {thisProduct.stockcount > 0 ? <span className="success">Instock</span> : <span className="error">Out of stock</span>}
    
                </div>
                <div className="productmain__productdetails">
                    <h3>PRODUCT DETAILS <NotesRoundedIcon/></h3>
                    <h4>Notes</h4>
                    <p>Topnotes: {thisProduct.notes.Topnotes.join(', ')}</p>
                    <p>Middlenotes: {thisProduct.notes.Middlenotes.join(', ')}</p>
                    <p>Basenotes: {thisProduct.notes.Basenotes.join(', ')}</p>
                    <h4>Description</h4>
                    <p>{thisProduct.description}</p>
                    <h4>Launch year</h4>
                    <p>{thisProduct.launch}</p>
                    <h4>Concentration</h4>
                    <p>{thisProduct.concentration}</p>
                </div>
            </div>
        </div>
    )
}
export default Productmain
